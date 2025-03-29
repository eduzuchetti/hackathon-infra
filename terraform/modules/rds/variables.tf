variable "name" {
  description = "Name of the RDS instance"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the RDS instance will be created"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs where the RDS instance will be created"
  type        = list(string)
}

variable "allowed_cidr_blocks" {
  description = "List of CIDR blocks that are allowed to access the RDS instance"
  type        = list(string)
  default     = []
}

variable "security_group_ids" {
  description = "List of security group IDs that are allowed to access the RDS instance"
  type        = list(string)
  default     = []
}

variable "engine_version" {
  description = "Version of MySQL to use"
  type        = string
  default     = "8.0"
}

variable "instance_class" {
  description = "Instance class for the RDS instance"
  type        = string
  default     = "db.t3.small"
}

variable "allocated_storage" {
  description = "Allocated storage in GB"
  type        = number
  default     = 20
}

variable "storage_type" {
  description = "Storage type for the RDS instance"
  type        = string
  default     = "gp2"
}

variable "storage_encrypted" {
  description = "Whether to encrypt the storage"
  type        = bool
  default     = true
}

variable "kms_key_id" {
  description = "KMS key ID for encryption"
  type        = string
  default     = null
}

variable "database_name" {
  description = "Name of the database to create"
  type        = string
}

variable "username" {
  description = "Username for the master DB user"
  type        = string
  default     = "admin"
}

variable "password" {
  description = "Password for the master DB user"
  type        = string
  sensitive   = true
}

variable "backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7
}

variable "backup_window" {
  description = "Daily time range during which backups are created"
  type        = string
  default     = "03:00-04:00"
}

variable "maintenance_window" {
  description = "Weekly time range during which maintenance can occur"
  type        = string
  default     = "sun:04:00-sun:05:00"
}

variable "multi_az" {
  description = "Whether to create a multi-AZ deployment"
  type        = bool
  default     = false
}

variable "publicly_accessible" {
  description = "Whether the DB should have a public IP address"
  type        = bool
  default     = false
}

variable "skip_final_snapshot" {
  description = "Whether to skip final snapshot when destroying the resource"
  type        = bool
  default     = false
}

variable "deletion_protection" {
  description = "Whether deletion protection is enabled"
  type        = bool
  default     = true
}

variable "performance_insights_enabled" {
  description = "Whether to enable Performance Insights"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
} 