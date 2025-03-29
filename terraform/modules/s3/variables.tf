variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "tags" {
  description = "A map of tags to assign to the bucket"
  type        = map(string)
  default     = {}
}

variable "acl" {
  description = "The canned ACL to apply to the bucket"
  type        = string
  default     = "private"
}

variable "versioning_enabled" {
  description = "Whether versioning is enabled for the bucket"
  type        = bool
  default     = false
}

variable "sse_algorithm" {
  description = "The server-side encryption algorithm to use"
  type        = string
  default     = "AES256"
}

variable "kms_key_id" {
  description = "The KMS key ID to use for the default encryption"
  type        = string
  default     = null
}

variable "block_public_acls" {
  description = "Whether Amazon S3 should block public ACLs for this bucket"
  type        = bool
  default     = true
}

variable "block_public_policy" {
  description = "Whether Amazon S3 should block public bucket policies for this bucket"
  type        = bool
  default     = true
}

variable "ignore_public_acls" {
  description = "Whether Amazon S3 should ignore public ACLs for this bucket"
  type        = bool
  default     = true
}

variable "restrict_public_buckets" {
  description = "Whether Amazon S3 should restrict public bucket policies for this bucket"
  type        = bool
  default     = true
}

variable "lifecycle_rules" {
  description = "A list of lifecycle rules to apply to the bucket"
  type = list(object({
    id     = string
    status = string
    transitions = optional(list(object({
      days          = number
      storage_class = string
    })))
    expiration = optional(object({
      days = number
    }))
  }))
  default = []
}

variable "cors_rules" {
  description = "A list of CORS rules to apply to the bucket"
  type = list(object({
    allowed_headers = list(string)
    allowed_methods = list(string)
    allowed_origins = list(string)
    expose_headers  = list(string)
    max_age_seconds = number
  }))
  default = null
} 