variable "repository_name" {
  description = "Name of the ECR repository"
  type        = string
}

variable "image_tag_mutability" {
  description = "The tag mutability setting for the repository"
  type        = string
  default     = "MUTABLE"
}

variable "scan_on_push" {
  description = "Indicates whether images are scanned after being pushed to the repository"
  type        = bool
  default     = true
}

variable "encryption_type" {
  description = "The encryption type to use for the repository"
  type        = string
  default     = "AES256"
}

variable "kms_key" {
  description = "The ARN of the KMS key to use when encryption_type is KMS"
  type        = string
  default     = null
}

variable "enable_lifecycle_policy" {
  description = "Whether to enable lifecycle policy for the repository"
  type        = bool
  default     = true
}

variable "lifecycle_policy_rules" {
  description = "List of lifecycle policy rules"
  type        = any
  default = [
    {
      rulePriority = 1
      description  = "Keep last 30 images"
      selection = {
        tagStatus     = "any"
        countType     = "imageCountMoreThan"
        countNumber   = 30
      }
      action = {
        type = "expire"
      }
    }
  ]
}

variable "repository_policy" {
  description = "Repository policy JSON"
  type        = string
  default     = null
}

variable "tags" {
  description = "A map of tags to assign to the repository"
  type        = map(string)
  default     = {}
} 