#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="dev"
ACTION="plan"

# Help function
function show_help {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -e, --environment ENV   Environment to deploy (dev or prod, default: dev)"
    echo "  -a, --action ACTION     Action to perform (plan, apply, destroy, default: plan)"
    echo "  -h, --help              Show this help message"
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -e|--environment)
            ENVIRONMENT="$2"
            shift
            shift
            ;;
        -a|--action)
            ACTION="$2"
            shift
            shift
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
    echo -e "${RED}Error: Environment must be either 'dev' or 'prod'${NC}"
    exit 1
fi

# Validate action
if [[ "$ACTION" != "plan" && "$ACTION" != "apply" && "$ACTION" != "destroy" ]]; then
    echo -e "${RED}Error: Action must be either 'plan', 'apply', or 'destroy'${NC}"
    exit 1
fi

# Set working directory
WORKING_DIR="terraform/environments/$ENVIRONMENT"

# Check if terraform.tfvars exists
if [[ ! -f "$WORKING_DIR/terraform.tfvars" ]]; then
    echo -e "${YELLOW}Warning: terraform.tfvars file not found in $WORKING_DIR${NC}"
    echo -e "${YELLOW}Please copy terraform.tfvars.example to terraform.tfvars and fill in the values${NC}"
    exit 1
fi

# Navigate to environment directory
cd "$WORKING_DIR"

# Initialize Terraform
echo -e "${GREEN}Initializing Terraform in $ENVIRONMENT environment...${NC}"
terraform init

# Perform requested action
case $ACTION in
    plan)
        echo -e "${GREEN}Planning Terraform changes for $ENVIRONMENT environment...${NC}"
        terraform plan
        ;;
    apply)
        echo -e "${GREEN}Applying Terraform changes to $ENVIRONMENT environment...${NC}"
        terraform apply
        ;;
    destroy)
        echo -e "${RED}CAUTION: You are about to destroy the $ENVIRONMENT environment!${NC}"
        read -p "Are you sure you want to continue? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${RED}Destroying $ENVIRONMENT environment...${NC}"
            terraform destroy
        else
            echo -e "${GREEN}Destroy operation cancelled.${NC}"
            exit 0
        fi
        ;;
esac

echo -e "${GREEN}Operation completed successfully!${NC}" 