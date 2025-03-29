variable "name" {
  description = "Name prefix for ALB resources"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC where ALB will be deployed"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs where ALB will be deployed"
  type        = list(string)
}

variable "internal" {
  description = "Whether the ALB is internal or internet-facing"
  type        = bool
  default     = false
}

variable "target_port" {
  description = "Port on which targets receive traffic"
  type        = number
  default     = 80
}

variable "enable_deletion_protection" {
  description = "Whether to enable deletion protection on the ALB"
  type        = bool
  default     = false
}

variable "drop_invalid_header_fields" {
  description = "Whether to drop invalid header fields in HTTP requests"
  type        = bool
  default     = true
}

variable "idle_timeout" {
  description = "The time in seconds that the connection is allowed to be idle"
  type        = number
  default     = 60
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate to use for HTTPS listener"
  type        = string
  default     = null
}

variable "ssl_policy" {
  description = "SSL policy for HTTPS listener"
  type        = string
  default     = "ELBSecurityPolicy-2016-08"
}

variable "http_to_https_redirect" {
  description = "Whether to redirect HTTP traffic to HTTPS"
  type        = bool
  default     = true
}

variable "health_check_path" {
  description = "Path for ALB health check"
  type        = string
  default     = "/"
}

variable "health_check_interval" {
  description = "Interval between ALB health checks (seconds)"
  type        = number
  default     = 30
}

variable "health_check_timeout" {
  description = "Timeout for ALB health checks (seconds)"
  type        = number
  default     = 5
}

variable "health_check_healthy_threshold" {
  description = "Number of consecutive successful health checks to be considered healthy"
  type        = number
  default     = 3
}

variable "health_check_unhealthy_threshold" {
  description = "Number of consecutive failed health checks to be considered unhealthy"
  type        = number
  default     = 3
}

variable "health_check_matcher" {
  description = "HTTP status codes to use when checking for a successful response from a target"
  type        = string
  default     = "200-299"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
} 