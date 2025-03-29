variable "role_name" {
  description = "Name of the IAM role to create for GitHub Actions"
  type        = string
  default     = "github-actions-role"
}

variable "github_org" {
  description = "GitHub organization name"
  type        = string
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

variable "tags" {
  description = "Tags to apply to created resources"
  type        = map(string)
  default     = {}
} 