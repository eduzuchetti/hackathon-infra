variable "bucket_name" {
  description = "Name of the S3 bucket to be created for frontend hosting"
  type        = string
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {}
} 