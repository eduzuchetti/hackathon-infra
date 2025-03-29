terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "aws_db_subnet_group" "this" {
  name        = var.name
  description = "Subnet group for ${var.name} RDS instance"
  subnet_ids  = var.subnet_ids

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-subnet-group"
    }
  )
}

resource "aws_security_group" "rds" {
  name        = "${var.name}-rds-sg"
  description = "Security group for ${var.name} RDS instance"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
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
      Name = "${var.name}-rds-sg"
    }
  )
}

resource "aws_db_parameter_group" "this" {
  name        = "${var.name}-parameter-group"
  family      = "mysql8.0"
  description = "Parameter group for ${var.name}"

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "character_set_client"
    value = "utf8mb4"
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-parameter-group"
    }
  )
}

resource "aws_db_instance" "this" {
  identifier           = var.name
  engine               = "mysql"
  engine_version       = var.engine_version
  instance_class       = var.instance_class
  allocated_storage    = var.allocated_storage
  storage_type         = var.storage_type
  storage_encrypted    = var.storage_encrypted
  kms_key_id           = var.kms_key_id

  db_name                = var.database_name
  username               = var.username
  password              = var.password
  port                   = 3306

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.this.name
  parameter_group_name   = aws_db_parameter_group.this.name

  backup_retention_period = var.backup_retention_period
  backup_window           = var.backup_window
  maintenance_window      = var.maintenance_window

  multi_az               = var.multi_az
  publicly_accessible    = var.publicly_accessible
  skip_final_snapshot    = var.skip_final_snapshot
  final_snapshot_identifier = var.skip_final_snapshot ? null : "${var.name}-final-snapshot-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  
  deletion_protection    = var.deletion_protection
  
  enabled_cloudwatch_logs_exports = ["audit", "error", "general", "slowquery"]
  
  performance_insights_enabled = false # var.performance_insights_enabled
  
  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )

  lifecycle {
    prevent_destroy = true
  }
} 