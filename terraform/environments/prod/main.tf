terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # In production, you would use a remote backend
  # backend "s3" {
  #   bucket         = "hackathon-infra-terraform-state"
  #   key            = "prod/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-state-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "prod"
      Project     = "hackathon"
      ManagedBy   = "terraform"
    }
  }
}

# Custom VPC for the infrastructure
module "vpc" {
  source = "../../modules/vpc"
  name   = "${var.project_name}-${var.environment}"
  
  vpc_cidr           = var.vpc_cidr
  az_count           = var.az_count
  create_nat_gateway = var.create_nat_gateway
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# ECR Repository for docker images
module "ecr" {
  source = "../../modules/ecr"
  
  repository_name = "${var.project_name}-app"
  
  # Production settings
  scan_on_push = true
  image_tag_mutability = "MUTABLE"  # Prevents tag overwriting
  
  # More restrictive lifecycle policy for production
  lifecycle_policy_rules = [
    {
      rulePriority = 1
      description  = "Keep last 10 production releases"
      selection = {
        tagStatus     = "tagged"
        tagPrefixList = ["release-"]
        countType     = "imageCountMoreThan"
        countNumber   = 10
      }
      action = {
        type = "expire"
      }
    },
    {
      rulePriority = 2
      description  = "Expire untagged images older than 14 days"
      selection = {
        tagStatus   = "untagged"
        countType   = "sinceImagePushed"
        countUnit   = "days"
        countNumber = 14
      }
      action = {
        type = "expire"
      }
    }
  ]
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# S3 bucket for application assets
module "app_storage" {
  source      = "../../modules/s3"
  bucket_name = "${var.project_name}-${var.environment}-raw-data"

  versioning_enabled = true
  
  # More strict settings for production
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
  
  # Lifecycle rules for cost optimization
  lifecycle_rules = [
    {
      id     = "archive-old-objects"
      status = "Enabled"
      transitions = [
        {
          days          = 90
          storage_class = "STANDARD_IA"
        },
        {
          days          = 365
          storage_class = "GLACIER"
        }
      ]
    }
  ]
  
  tags = {
    Name        = "${var.project_name}-assets-${var.environment}"
    Environment = var.environment
  }
}

# RDS MySQL Database
module "database" {
  source       = "../../modules/rds"
  name         = "${var.project_name}-db-${var.environment}"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.public_subnet_ids  # Using public subnets for public access

  database_name      = var.db_name
  username           = var.db_username
  password           = var.db_password
  instance_class     = "db.t4g.small"
  allocated_storage  = 50
  
  # Ensure publicly accessible
  publicly_accessible    = true
  multi_az               = true
  skip_final_snapshot    = false
  deletion_protection    = true
  storage_encrypted      = true
  backup_retention_period = 30
  
  # Allow access from all IPs in the VPC
  allowed_cidr_blocks = [module.vpc.vpc_cidr_block]
  
  tags = {
    Name        = "${var.project_name}-db-${var.environment}"
    Environment = var.environment
  }
}

# Create the SSM parameter for the database password
resource "aws_ssm_parameter" "db_password" {
  name        = "/${var.project_name}/${var.environment}/db_password"
  description = "Password for RDS database"
  type        = "SecureString"
  value       = var.db_password

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# ECS Cluster and Service
module "app_cluster" {
  source        = "../../modules/ecs"
  cluster_name  = "${var.project_name}-${var.environment}-cluster"
  service_name  = "${var.project_name}-${var.environment}-service-JustAPI"
  
  project_name  = var.project_name
  environment   = var.environment
  
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.private_subnet_ids  # Using private subnets for ECS tasks in production
  
  # Production settings
  assign_public_ip = false
  
  container_name  = "${var.project_name}-app"
  container_image = "${module.ecr.repository_url}:${var.app_version}"
  container_port  = 8080
  

  # Higher resources for production
  task_cpu    = "256"
  task_memory = "512"
  desired_count = 1
  
  # Enable container insights for better monitoring
  container_insights = true
  
  # Fargate capacity provider strategy
  capacity_provider_strategy = [
    {
      capacity_provider = "FARGATE"
      weight            = 1
    }
  ]
  
  # Enable circuit breaker with rollback for production
  deployment_circuit_breaker = {
    enable   = true
    rollback = true
  }
  
  environment_variables = [
    {
      name  = "NODE_ENV"
      value = var.environment
    },
    {
      name  = "DB_HOST"
      value = module.database.db_instance_address
    },
    {
      name  = "DB_PORT"
      value = "3306"
    },
    {
      name  = "DB_NAME"
      value = var.db_name
    },
    {
      name  = "DB_USER"
      value = var.db_username
    },
    {
      name  = "S3_BUCKET"
      value = module.app_storage.bucket_id
    }
  ]
  
  # Use Secrets Manager for sensitive information
  secrets = [
    {
      name      = "DB_PASSWORD"
      valueFrom = aws_ssm_parameter.db_password.arn
    }
  ]
  
  tags = {
    Name        = "${var.project_name}-ecs-${var.environment}"
    Environment = var.environment
  }
}

# OpenSearch Service
module "opensearch" {
  source = "../../modules/opensearch"
  
  domain_name = "${var.project_name}-search-${var.environment}"
  
  # Production configuration
  instance_type   = "t3.small.search"  # Still using free tier instance, can be upgraded as needed
  instance_count  = 1
  ebs_volume_size = 10
  
  # Enhanced security for production
  encrypt_at_rest         = true
  node_to_node_encryption = true
  enforce_https           = true
  advanced_security_enabled = true
  
  # Security settings
  master_user_name     = var.opensearch_master_user
  master_user_password = var.opensearch_master_password
  
  # Tags
  tags = {
    Name        = "${var.project_name}-search-${var.environment}"
    Environment = var.environment
  }
}

module "github_oidc" {
  source = "../../modules/github-oidc"

  github_org                 = "eliezerfrocha"
  # ecr_repository_arn         = module.ecr.repository_arn
  ecs_cluster_arn            = module.app_cluster.cluster_arn
  ecs_task_execution_role_arn = module.app_cluster.task_execution_role_arn
  ecs_task_role_arn          = module.app_cluster.task_role_arn
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
} 