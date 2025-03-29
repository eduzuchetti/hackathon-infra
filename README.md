# Hackathon Infrastructure

This repository contains Terraform code for provisioning AWS infrastructure for hackathon projects.

## Infrastructure Components

- **RDS MySQL**: Database for application data
- **ECS Cluster and Service**: Container orchestration for applications
- **S3 Buckets**: Object storage for static assets and other files

## Requirements

- Terraform v1.11.x
- AWS CLI configured with appropriate credentials
- Git

## Getting Started

1. Clone this repository
2. Navigate to the environment directory you want to deploy:

```bash
cd terraform/environments/dev
```

3. Initialize Terraform:

```bash
terraform init
```

4. Review the deployment plan:

```bash
terraform plan
```

5. Apply the changes:

```bash
terraform apply
```

## Repository Structure

```
terraform/
├── modules/                # Reusable Terraform modules
│   ├── rds/                # RDS MySQL module
│   ├── ecs/                # ECS cluster and service module
│   └── s3/                 # S3 bucket module
└── environments/           # Environment-specific configurations
    ├── dev/                # Development environment
    └── prod/               # Production environment
```

## Best Practices

- Use remote state with locking
- Keep sensitive values in AWS Secrets Manager or use AWS SSM Parameter Store
- Use consistent naming conventions
- Tag all resources appropriately
- Use minimum IAM permissions

## Contributing

Please follow the existing code structure and naming conventions when adding new features or modules. 