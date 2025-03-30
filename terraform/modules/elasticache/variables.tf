variable "name" {
  description = "Nome do ElastiCache Redis"
  type        = string
}

variable "vpc_id" {
  description = "ID da VPC onde o ElastiCache será criado"
  type        = string
}

variable "subnet_ids" {
  description = "IDs das subnets onde o ElastiCache será criado"
  type        = list(string)
}

variable "security_group_ids" {
  description = "IDs dos security groups que terão acesso ao ElastiCache"
  type        = list(string)
  default     = []
}

variable "instance_type" {
  description = "Tipo de instância do ElastiCache"
  type        = string
  default     = "cache.t4g.micro"
}

variable "num_cache_clusters" {
  description = "Número de nós no cluster ElastiCache"
  type        = number
  default     = 1
}

variable "multi_az_enabled" {
  description = "Ativar multi AZ para o ElastiCache"
  type        = bool
  default     = false
}

variable "engine_version" {
  description = "Versão do Redis"
  type        = string
  default     = "6.2"
}

variable "maintenance_window" {
  description = "Janela de manutenção do ElastiCache"
  type        = string
  default     = "sun:05:00-sun:06:00"
}

variable "snapshot_retention_limit" {
  description = "Número de dias para reter snapshots"
  type        = number
  default     = 7
}

variable "snapshot_window" {
  description = "Janela de snapshot do ElastiCache"
  type        = string
  default     = "03:00-04:00"
}

variable "auth_token" {
  description = "Token de autenticação (senha) para o Redis. Mínimo de 16 caracteres."
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags a serem aplicadas aos recursos"
  type        = map(string)
  default     = {}
} 