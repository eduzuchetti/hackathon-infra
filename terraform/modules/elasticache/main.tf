terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "aws_elasticache_subnet_group" "this" {
  name        = "${var.name}-subnet-group"
  description = "Subnet group for ${var.name} ElastiCache"
  subnet_ids  = var.subnet_ids
}

resource "aws_security_group" "elasticache" {
  name        = "${var.name}-elasticache-sg"
  description = "Security group for ${var.name} ElastiCache"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Permitir acesso público. Em produção, restrinja isso.
    security_groups = var.security_group_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-elasticache-sg"
    }
  )
}

resource "aws_elasticache_parameter_group" "this" {
  name        = "${var.name}-parameter-group"
  family      = "redis6.x"
  description = "Parameter group for ${var.name}"

  # Parâmetros para permitir acesso público
  parameter {
    name  = "bind"
    value = "0.0.0.0"
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-parameter-group"
    }
  )
}

resource "aws_elasticache_replication_group" "this" {
  replication_group_id          = var.name
  description                   = "${var.name} Redis cluster"
  node_type                     = var.instance_type
  num_cache_clusters            = var.num_cache_clusters
  parameter_group_name          = aws_elasticache_parameter_group.this.name
  subnet_group_name             = aws_elasticache_subnet_group.this.name
  security_group_ids            = [aws_security_group.elasticache.id]
  port                          = 6379
  multi_az_enabled              = var.multi_az_enabled
  automatic_failover_enabled    = var.multi_az_enabled && var.num_cache_clusters > 1
  auto_minor_version_upgrade    = true
  maintenance_window            = var.maintenance_window
  snapshot_retention_limit      = var.snapshot_retention_limit
  snapshot_window               = var.snapshot_window
  engine_version                = var.engine_version
  apply_immediately             = true
  transit_encryption_enabled    = true # Habilitar criptografia em trânsito
  auth_token                    = var.auth_token # Senha para autenticação
  at_rest_encryption_enabled    = true

  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )
} 