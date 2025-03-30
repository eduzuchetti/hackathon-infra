output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "The CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "public_subnet_ids" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnet_ids
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = module.ecr.repository_url
}

output "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  value       = module.ecr.repository_arn
}

output "opensearch_endpoint" {
  description = "Endpoint of the OpenSearch domain"
  value       = module.opensearch.endpoint
}

output "opensearch_dashboard_endpoint" {
  description = "Dashboard endpoint of the OpenSearch domain"
  value       = module.opensearch.dashboard_endpoint
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for application assets"
  value       = module.app_storage.bucket_id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket for application assets"
  value       = module.app_storage.bucket_arn
}

output "rds_endpoint" {
  description = "Endpoint of the RDS database"
  value       = module.database.db_instance_endpoint
}

output "rds_address" {
  description = "Address of the RDS database"
  value       = module.database.db_instance_address
}

output "rds_port" {
  description = "Port of the RDS database"
  value       = module.database.db_instance_port
}

output "rds_database_name" {
  description = "Name of the RDS database"
  value       = module.database.db_instance_name
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.app_cluster.cluster_name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = module.app_cluster.service_name
}

output "ecs_task_definition_arn" {
  description = "ARN of the ECS task definition"
  value       = module.app_cluster.task_definition_arn
}

output "ecs_task_execution_role_arn" {
  description = "ARN of the ECS task execution role"
  value       = module.app_cluster.task_execution_role_arn
}

output "ecs_task_role_arn" {
  description = "ARN of the ECS task role"
  value       = module.app_cluster.task_role_arn
}

output "github_actions_role_arn" {
  description = "ARN of the IAM role for GitHub Actions"
  value       = module.github_oidc.role_arn
}

output "github_actions_role_name" {
  description = "Name of the IAM role for GitHub Actions"
  value       = module.github_oidc.role_name
}

output "github_actions_admin_role_arn" {
  description = "ARN of the admin IAM role for GitHub Actions (eduzuchetti org)"
  value       = module.github_oidc.admin_role_arn
}

output "github_actions_admin_role_name" {
  description = "Name of the admin IAM role for GitHub Actions (eduzuchetti org)"
  value       = module.github_oidc.admin_role_name
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.app_alb.alb_dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = module.app_alb.alb_zone_id
}

# Frontend outputs
output "frontend_s3_bucket" {
  description = "Name of the S3 bucket for frontend hosting"
  value       = module.frontend.s3_bucket_id
}

output "frontend_cloudfront_distribution" {
  description = "Domain name of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_domain_name
}

output "frontend_cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_id
}

output "frontend_deploy_role_arn" {
  description = "ARN of the IAM role for frontend deployment"
  value       = module.github_oidc.role_arn
}

# Frontend Outputs
output "frontend_bucket_name" {
  description = "Nome do bucket S3 para o frontend"
  value       = module.frontend.s3_bucket_name
}

output "frontend_cloudfront_domain" {
  description = "CloudFront domain name"
  value       = module.frontend.cloudfront_domain_name
}

output "frontend_cloudfront_id" {
  description = "CloudFront distribution ID"
  value       = module.frontend.cloudfront_distribution_id
}

# ElastiCache Outputs
output "elasticache_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = module.elasticache.elasticache_endpoint
}

output "elasticache_port" {
  description = "ElastiCache Redis port"
  value       = module.elasticache.elasticache_port
}

output "elasticache_connection_string" {
  description = "ElastiCache Redis connection string (format: redis://:<auth-token>@<endpoint>:<port>)"
  value       = "redis://:<auth-token>@${module.elasticache.elasticache_endpoint}:${module.elasticache.elasticache_port}"
  sensitive   = true
} 