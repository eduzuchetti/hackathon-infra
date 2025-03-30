terraform {
  required_version = ">= 1.11.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Create the OIDC Provider for GitHub
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
  
  tags = var.tags
}

# Create an IAM role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = var.role_name
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringLike = {
            "token.actions.githubusercontent.com:sub": "repo:${var.github_org}/${var.github_repo}:*"
          },
          StringEquals = {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })
  
  tags = var.tags
}

# Create an admin IAM role for GitHub Actions
resource "aws_iam_role" "github_actions_admin" {
  name  = var.admin_role_name
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringLike = {
            "token.actions.githubusercontent.com:sub": "repo:${var.admin_github_org}/${var.admin_github_repo}:*"
          },
          StringEquals = {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })
  
  tags = var.tags
}

# Create policy for ECR operations
resource "aws_iam_policy" "ecr_permissions" {
  name        = "${var.role_name}-ecr-policy"
  description = "Permissions for GitHub Actions to push to ECR"
  
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:InitiateLayerUpload",
          "ecr:BatchGetImage",
          "ecr:PutImage",
          "ecr:GetAuthorizationToken"
        ],
        Resource = var.ecr_repository_arn != null ? var.ecr_repository_arn : "*"
      }
    ]
  })
  
  tags = var.tags
}

# Create policy for ECS operations
resource "aws_iam_policy" "ecs_permissions" {
  name        = "${var.role_name}-ecs-policy"
  description = "Permissions for GitHub Actions to update ECS services"
  
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices",
          "ecs:DescribeTasks"
        ],
        Resource = ["*"]
      },
      {
        Effect = "Allow",
        Action = [
          "iam:PassRole"
        ],
        Resource = [
          var.ecs_task_execution_role_arn,
          var.ecs_task_role_arn
        ]
      }
    ]
  })
  
  tags = var.tags
}

# Create policy for S3 operations for frontend deployment
resource "aws_iam_policy" "s3_permissions" {
  name        = "${var.role_name}-s3-policy"
  description = "Permissions for GitHub Actions to deploy to S3"
  
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ],
        Resource = [
          var.frontend_s3_bucket_arn,
          "${var.frontend_s3_bucket_arn}/*"
        ]
      }
    ]
  })
  
  tags = var.tags
}

# Create policy for CloudFront invalidation
resource "aws_iam_policy" "cloudfront_permissions" {
  name        = "${var.role_name}-cloudfront-policy"
  description = "Permissions for GitHub Actions to create CloudFront invalidations"
  
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations"
        ],
        Resource = var.frontend_cloudfront_distribution_arn
      }
    ]
  })
  
  tags = var.tags
}

# Attach ECR permissions policy to the role
resource "aws_iam_role_policy_attachment" "ecr_permissions" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.ecr_permissions.arn
}

# Attach ECS permissions policy to the role
resource "aws_iam_role_policy_attachment" "ecs_permissions" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.ecs_permissions.arn
}

# Attach S3 permissions policy to the role
resource "aws_iam_role_policy_attachment" "s3_permissions" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.s3_permissions.arn
}

# Attach CloudFront permissions policy to the role
resource "aws_iam_role_policy_attachment" "cloudfront_permissions" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.cloudfront_permissions.arn
}

# Attach AWS PowerUserAccess policy to the admin role
resource "aws_iam_role_policy_attachment" "admin_poweruser" {
  role       = aws_iam_role.github_actions_admin.name
  policy_arn = "arn:aws:iam::aws:policy/PowerUserAccess"
} 