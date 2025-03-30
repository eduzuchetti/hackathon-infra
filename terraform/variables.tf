variable "aws_region" {
  description = "AWS region to deploy resources to"
  type        = string
  default     = "us-east-1"
}

variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "hackathon"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

# VPC Configuration
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "az_count" {
  description = "Number of availability zones to use"
  type        = number
  default     = 3  # Using 3 AZs for production for better availability
}

variable "create_nat_gateway" {
  description = "Whether to create a NAT gateway"
  type        = bool
  default     = true
}

# Database Configuration
variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "hackathon"
}

variable "db_username" {
  description = "Username for the database"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Password for the database"
  type        = string
  sensitive   = true
}

# OpenSearch Configuration
variable "opensearch_master_user" {
  description = "Master username for OpenSearch"
  type        = string
  default     = "admin"
}

variable "opensearch_master_password" {
  description = "Master password for OpenSearch"
  type        = string
  sensitive   = true
  default   = "Hackat0nAIDvogado@"
}

variable "app_version" {
  description = "Version tag of the container image to deploy"
  type        = string
  default     = "latest"
}

# GitHub Configuration
variable "github_org" {
  description = "GitHub organization name"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
} 