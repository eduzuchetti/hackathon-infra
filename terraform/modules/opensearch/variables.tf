variable "domain_name" {
  description = "Name of the OpenSearch domain"
  type        = string
}

variable "engine_version" {
  description = "Version of OpenSearch to deploy"
  type        = string
  default     = "OpenSearch_2.5"
}

variable "instance_type" {
  description = "Instance type for the OpenSearch cluster"
  type        = string
  default     = "t3.small.search"  # Free tier eligible
}

variable "instance_count" {
  description = "Number of instances in the OpenSearch cluster"
  type        = number
  default     = 1  # Free tier allows only 1 instance
}

variable "availability_zone_count" {
  description = "Number of availability zones for the OpenSearch cluster"
  type        = number
  default     = 2
}

variable "ebs_volume_size" {
  description = "Size of the EBS volume attached to each instance in GB"
  type        = number
  default     = 10  # Free tier allows 10GB
}

variable "ebs_volume_type" {
  description = "Type of EBS volume to use"
  type        = string
  default     = "gp2"
}

variable "encrypt_at_rest" {
  description = "Whether to enable encryption at rest"
  type        = bool
  default     = true
}

variable "node_to_node_encryption" {
  description = "Whether to enable node-to-node encryption"
  type        = bool
  default     = true
}

variable "enforce_https" {
  description = "Whether to enforce HTTPS for all traffic"
  type        = bool
  default     = true
}

variable "tls_security_policy" {
  description = "TLS security policy to apply to the domain endpoint"
  type        = string
  default     = "Policy-Min-TLS-1-2-2019-07"
}

variable "advanced_security_enabled" {
  description = "Whether to enable fine-grained access control"
  type        = bool
  default     = true
}

variable "internal_user_database_enabled" {
  description = "Whether to enable the internal user database"
  type        = bool
  default     = true
}

variable "create_master_user" {
  description = "Whether to create a master user for the OpenSearch domain"
  type        = bool
  default     = true
}

variable "master_user_name" {
  description = "Username for the master user"
  type        = string
  default     = "admin"
}

variable "master_user_password" {
  description = "Password for the master user"
  type        = string
  default     = null
  sensitive   = true
}

variable "access_policy" {
  description = "IAM policy document specifying the access policies for the domain"
  type        = string
  default     = null
}

variable "log_retention_days" {
  description = "Number of days to retain CloudWatch logs"
  type        = number
  default     = 30
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
} 