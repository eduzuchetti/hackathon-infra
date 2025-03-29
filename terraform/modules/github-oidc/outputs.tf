output "role_arn" {
  description = "ARN of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

output "role_name" {
  description = "Name of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.name
}

output "oidc_provider_arn" {
  description = "ARN of the GitHub OIDC provider"
  value       = aws_iam_openid_connect_provider.github.arn
}

output "ecr_policy_arn" {
  description = "ARN of the ECR policy"
  value       = aws_iam_policy.ecr_permissions.arn
}

output "ecs_policy_arn" {
  description = "ARN of the ECS policy"
  value       = aws_iam_policy.ecs_permissions.arn
} 