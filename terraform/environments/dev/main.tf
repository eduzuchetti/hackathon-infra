terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # For production, you would use a remote backend like S3
  # backend "s3" {
  #   bucket         = "hackathon-infra-terraform-state"
  #   key            = "dev/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-state-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "dev"
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
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# S3 bucket for application assets
module "app_storage" {
  source      = "../../modules/s3"
  bucket_name = "${var.project_name}-assets-${var.environment}"

  versioning_enabled = true
  
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
  instance_class     = "db.t4g.micro"
  allocated_storage  = 20
  skip_final_snapshot = true
  
  # Ensure publicly accessible
  publicly_accessible = true
  deletion_protection = false
  
  # Allow access from all IPs in the VPC
  allowed_cidr_blocks = [module.vpc.vpc_cidr_block]
  
  tags = {
    Name        = "${var.project_name}-db-${var.environment}"
    Environment = var.environment
  }
}

# ECS Cluster and Service
module "app_cluster" {
  source        = "../../modules/ecs"
  cluster_name  = "${var.project_name}-cluster-${var.environment}"
  service_name  = "${var.project_name}-service-${var.environment}"
  
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.public_subnet_ids  # Using public subnets for ECS tasks
  
  # For development, we'll use public subnets for simplicity
  assign_public_ip = true
  
  container_name  = "${var.project_name}-app"
  container_image = "${module.ecr.repository_url}:latest"
  container_port  = 3000
  
  task_cpu    = "256"
  task_memory = "512"
  
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
  
  # For secrets, you should use AWS Secrets Manager or Parameter Store in production
  secrets = [
    {
      name      = "DB_PASSWORD"
      valueFrom = "arn:aws:ssm:${var.aws_region}:${var.aws_account_id}:parameter/${var.project_name}/${var.environment}/db_password"
    }
  ]
  
  tags = {
    Name        = "${var.project_name}-ecs-${var.environment}"
    Environment = var.environment
  }
} 