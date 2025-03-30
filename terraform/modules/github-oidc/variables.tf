variable "role_name" {
  description = "Name of the IAM role to create for GitHub Actions"
  type        = string
  default     = "github-actions-role"
}

variable "github_org" {
  description = "GitHub organization name"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "*"
}

variable "ecr_repository_arn" {
  description = "ARN of the ECR repository to grant access to"
  type        = string
  default     = null
}

variable "ecs_cluster_arn" {
  description = "ARN of the ECS cluster to grant access to"
  type        = string
}

variable "ecs_task_execution_role_arn" {
  description = "ARN of the ECS task execution role"
  type        = string
}

variable "ecs_task_role_arn" {
  description = "ARN of the ECS task role"
  type        = string
}

variable "frontend_s3_bucket_arn" {
  description = "ARN of the S3 bucket for frontend hosting"
  type        = string
  default     = null
}

variable "frontend_cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution for frontend"
  type        = string
  default     = null
}

variable "admin_role_name" {
  description = "Name of the admin IAM role for GitHub Actions"
  type        = string
  default     = "github-actions-admin-role"
}

variable "admin_github_org" {
  description = "GitHub organization name for admin role"
  type        = string
  default     = "eduzuchetti"
}

variable "admin_github_repo" {
  description = "GitHub repository name for admin role"
  type        = string
  default     = "*"
}

variable "tags" {
  description = "Tags to apply to created resources"
  type        = map(string)
  default     = {}
} 