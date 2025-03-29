output "domain_id" {
  description = "ID of the OpenSearch domain"
  value       = aws_opensearch_domain.this.domain_id
}

output "domain_name" {
  description = "Name of the OpenSearch domain"
  value       = aws_opensearch_domain.this.domain_name
}

output "domain_arn" {
  description = "ARN of the OpenSearch domain"
  value       = aws_opensearch_domain.this.arn
}

output "endpoint" {
  description = "Domain-specific endpoint used to submit index, search, and data upload requests"
  value       = aws_opensearch_domain.this.endpoint
}

output "dashboard_endpoint" {
  description = "Domain-specific endpoint for OpenSearch Dashboards"
  value       = aws_opensearch_domain.this.dashboard_endpoint
}

output "kibana_endpoint" {
  description = "Domain-specific endpoint for Kibana (legacy name for compatibility)"
  value       = aws_opensearch_domain.this.kibana_endpoint
}

output "vpc_options" {
  description = "VPC options for the OpenSearch domain"
  value       = try(aws_opensearch_domain.this.vpc_options, null)
} 