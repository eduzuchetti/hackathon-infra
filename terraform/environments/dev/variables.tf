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
  default     = "dev"
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
  default     = 2
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