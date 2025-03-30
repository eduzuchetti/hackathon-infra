output "s3_bucket_id" {
  description = "The name of the bucket"
  value       = aws_s3_bucket.frontend.id
}

output "s3_bucket_arn" {
  description = "The ARN of the bucket"
  value       = aws_s3_bucket.frontend.arn
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_distribution_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
} 