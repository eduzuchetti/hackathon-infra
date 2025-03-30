output "elasticache_endpoint" {
  description = "Endpoint do Redis ElastiCache"
  value       = aws_elasticache_replication_group.this.primary_endpoint_address
}

output "elasticache_port" {
  description = "Porta do Redis ElastiCache"
  value       = aws_elasticache_replication_group.this.port
}

output "elasticache_security_group_id" {
  description = "ID do security group do ElastiCache"
  value       = aws_security_group.elasticache.id
}

output "elasticache_arn" {
  description = "ARN do ElastiCache"
  value       = aws_elasticache_replication_group.this.arn
} 