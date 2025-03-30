variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}

variable "container_insights" {
  description = "Whether to enable container insights for the cluster"
  type        = bool
  default     = true
}

variable "capacity_providers" {
  description = "List of capacity providers to use for the cluster"
  type        = list(string)
  default     = ["FARGATE", "FARGATE_SPOT"]
}

variable "default_capacity_provider_strategy" {
  description = "Default capacity provider strategy for the cluster"
  type = list(object({
    capacity_provider = string
    weight            = number
    base              = optional(number)
  }))
  default = [
    {
      capacity_provider = "FARGATE"
      weight            = 1
    }
  ]
}

variable "vpc_id" {
  description = "ID of the VPC where ECS resources will be deployed"
  type        = string
}

variable "service_name" {
  description = "Name of the ECS service"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Name of the environment (dev, prod, etc.)"
  type        = string
}

variable "log_retention_in_days" {
  description = "Number of days to retain CloudWatch logs"
  type        = number
  default     = 30
}

variable "task_cpu" {
  description = "CPU value for the task (in CPU units)"
  type        = string
  default     = "256"
}

variable "task_memory" {
  description = "Memory value for the task (in MiB)"
  type        = string
  default     = "512"
}

variable "container_name" {
  description = "Name of the container"
  type        = string
  default     = "app"
}

variable "container_image" {
  description = "Docker image to run in the container"
  type        = string
}

variable "container_port" {
  description = "Port exposed by the container"
  type        = number
  default     = 80
}

variable "environment_variables" {
  description = "Environment variables for the container"
  type        = list(object({
    name  = string
    value = string
  }))
  default     = []
}

variable "secrets" {
  description = "Secrets for the container"
  type        = list(object({
    name      = string
    valueFrom = string
  }))
  default     = []
}

variable "volumes" {
  description = "List of volumes to attach to the container"
  type = list(object({
    name = string
    efs_volume_configuration = optional(object({
      file_system_id          = string
      root_directory          = optional(string)
      transit_encryption      = optional(string)
      transit_encryption_port = optional(number)
    }))
  }))
  default = []
}

variable "launch_type" {
  description = "Launch type on which to run your service"
  type        = string
  default     = "FARGATE"
}

variable "platform_version" {
  description = "Platform version on which to run your service (only applicable for FARGATE)"
  type        = string
  default     = "LATEST"
}

variable "desired_count" {
  description = "Number of instances of the task to run"
  type        = number
  default     = 1
}

variable "capacity_provider_strategy" {
  description = "Capacity provider strategy for the service"
  type = list(object({
    capacity_provider = string
    weight            = number
    base              = optional(number)
  }))
  default = []
}

variable "subnet_ids" {
  description = "List of subnet IDs where the task will run"
  type        = list(string)
}

variable "assign_public_ip" {
  description = "Whether to assign a public IP address to the ENI"
  type        = bool
  default     = false
}

variable "load_balancer" {
  description = "Load balancer configuration for the service"
  type = object({
    target_group_arn = string
  })
  default = null
}

variable "alb_security_group_id" {
  description = "Security group ID of the ALB"
  type        = string
  default     = null
}

variable "health_check_grace_period_seconds" {
  description = "Seconds to ignore failing load balancer health checks"
  type        = number
  default     = 60
}

variable "force_new_deployment" {
  description = "Whether to force a new deployment of the service"
  type        = bool
  default     = false
}

variable "enable_execute_command" {
  description = "Whether to enable ECS Exec for the service"
  type        = bool
  default     = false
}

variable "wait_for_steady_state" {
  description = "Whether to wait for the service to reach a steady state"
  type        = bool
  default     = false
}

variable "deployment_circuit_breaker" {
  description = "Configuration for deployment circuit breaker"
  type = object({
    enable   = bool
    rollback = bool
  })
  default = {
    enable   = true
    rollback = true
  }
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
} 