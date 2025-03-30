# Repositorio da API
https://github.com/eliezerfrocha/JusAPI

# Hackathon Infrastructure

Este repositório contém código Terraform para provisionar infraestrutura AWS para projetos de hackathon.

## Componentes da Infraestrutura

- **RDS MySQL**: Banco de dados para dados da aplicação
- **ECS Cluster e Serviço**: Orquestração de contêineres para aplicações
- **S3 Buckets**: Armazenamento de objetos para assets estáticos e outros arquivos
- **VPC**: Rede isolada para os recursos da aplicação
- **ALB (Application Load Balancer)**: Balanceador de carga para distribuir tráfego
- **ECR (Elastic Container Registry)**: Registro para imagens de contêineres
- **ElastiCache**: Serviço de cache em memória
- **OpenSearch**: Serviço de busca e análise de logs

## Requisitos

- Terraform v1.11.x
- AWS CLI configurado com credenciais apropriadas
- Git
- Acesso à conta AWS com permissões adequadas

## Começando

1. Clone este repositório
2. Configure as variáveis de ambiente necessárias:

```bash
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
```

3. Edite o arquivo `terraform.tfvars` com seus valores específicos

4. Inicialize o Terraform:

```bash
cd terraform
terraform init
```

5. Revise o plano de implantação:

```bash
terraform plan
```

6. Aplique as mudanças:

```bash
terraform apply
```

## Estrutura do Repositório

```
terraform/
├── main.tf                 # Configuração principal do Terraform
├── variables.tf            # Definição de variáveis
├── outputs.tf              # Saídas do Terraform
├── terraform.tfvars.example # Exemplo de arquivo de variáveis
├── modules/                # Módulos Terraform reutilizáveis
│   ├── alb/                # Módulo Application Load Balancer
│   ├── ecr/                # Módulo Elastic Container Registry
│   ├── ecs/                # Módulo ECS cluster e serviço
│   ├── elasticache/        # Módulo ElastiCache
│   ├── frontend/           # Módulo para aplicações frontend
│   ├── github-oidc/        # Módulo para autenticação OIDC com GitHub
│   ├── opensearch/         # Módulo OpenSearch
│   ├── rds/                # Módulo RDS MySQL
│   ├── s3/                 # Módulo S3 bucket
│   └── vpc/                # Módulo VPC
```

## Módulos Detalhados

### VPC
Configura uma Virtual Private Cloud com sub-redes públicas e privadas, tabelas de rotas e gateways.

### RDS
Provisiona um banco de dados MySQL com configurações de alta disponibilidade e backup.

### ECS
Configura um cluster ECS com serviços e definições de tarefas para execução de contêineres.

### S3
Cria buckets S3 para armazenamento de arquivos com políticas de acesso apropriadas.

### ALB
Configura um Application Load Balancer para distribuir tráfego entre instâncias ECS.

### ElastiCache
Provisiona clusters Redis para armazenamento em cache.

### OpenSearch
Configura domínios OpenSearch para busca e análise de logs.

## Melhores Práticas

- Use estado remoto com bloqueio
- Mantenha valores sensíveis no AWS Secrets Manager ou use AWS SSM Parameter Store
- Use convenções de nomenclatura consistentes
- Marque todos os recursos apropriadamente
- Use permissões IAM mínimas
- Implemente estratégias de backup e recuperação
- Monitore custos e otimize recursos

## Monitoramento e Observabilidade

- Configure CloudWatch Alarms para métricas críticas
- Implemente logging centralizado com grupos de logs do CloudWatch
- Use o AWS X-Ray para rastreamento distribuído
- Configure painéis de monitoramento para visualizar métricas importantes

## Solução de Problemas

### Problemas Comuns

1. **Erro de timeout durante o apply**:
   - Verifique suas configurações de rede e permissões IAM
   - Aumente o timeout no provider configuration

2. **Falha na criação de recursos**:
   - Verifique os limites de serviço da sua conta AWS
   - Confirme que as dependências estão sendo criadas na ordem correta

3. **Problemas de estado do Terraform**:
   - Use `terraform state list` para verificar o estado atual
   - Se necessário, use `terraform state rm` para remover recursos problemáticos

### Comandos Úteis

```bash
# Visualizar saídas
terraform output

# Destruir a infraestrutura
terraform destroy

# Formatar os arquivos de configuração
terraform fmt -recursive

# Validar a configuração
terraform validate
```

## Contribuindo

Por favor, siga a estrutura de código existente e as convenções de nomenclatura ao adicionar novos recursos ou módulos. Crie pull requests para todas as alterações e garanta que os testes passem antes de solicitar revisão.

## Segurança

- Rotacione as credenciais regularmente
- Use roles IAM com privilégios mínimos
- Implemente criptografia em trânsito e em repouso
- Realize auditorias de segurança periodicamente 
