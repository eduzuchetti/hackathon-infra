terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Create security group for ALB
resource "aws_security_group" "alb" {
  name        = "${var.name}-alb-sg"
  description = "Security group for application load balancer"
  vpc_id      = var.vpc_id

  # Allow HTTP traffic from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS traffic from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-alb-sg"
    }
  )
}

# Create the ALB
resource "aws_lb" "this" {
  name               = "${var.name}-alb"
  internal           = var.internal
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.subnet_ids

  enable_deletion_protection = var.enable_deletion_protection
  drop_invalid_header_fields = var.drop_invalid_header_fields
  idle_timeout               = var.idle_timeout

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-alb"
    }
  )
}

# Create target group for HTTP traffic
resource "aws_lb_target_group" "http" {
  name        = "${var.name}-tg"
  port        = var.target_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    interval            = var.health_check_interval
    path                = var.health_check_path
    port                = "traffic-port"
    healthy_threshold   = var.health_check_healthy_threshold
    unhealthy_threshold = var.health_check_unhealthy_threshold
    timeout             = var.health_check_timeout
    matcher             = var.health_check_matcher
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-tg"
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

# Create HTTP listener
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.http.arn
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-http-listener"
    }
  )
}

# Create HTTPS listener if certificate ARN is provided
resource "aws_lb_listener" "https" {
  count             = var.certificate_arn != null ? 1 : 0
  load_balancer_arn = aws_lb.this.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = var.ssl_policy
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.http.arn
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-https-listener"
    }
  )
}

# HTTP to HTTPS redirect if certificate ARN is provided
resource "aws_lb_listener" "http_redirect" {
  count             = var.certificate_arn != null && var.http_to_https_redirect ? 1 : 0
  load_balancer_arn = aws_lb.this.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-http-redirect"
    }
  )
} 