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