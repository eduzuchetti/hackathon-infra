# Estimativa de custos da infraestrutura AWS

Este documento apresenta uma estimativa de custos para os recursos AWS criados via Terraform, excluindo recursos que estão dentro do limite do AWS Free Tier.

## Recursos e estimativas de custos

| Recurso | Tipo | Especificações | Custo por hora (USD) | Custo mensal (730h) (USD) |
|---------|------|---------------|---------------------|--------------------------|
| RDS MySQL | db.t4g.small | 50GB armazenamento, Multi-AZ | $0.068 (por instância) x 2 = $0.136 | $99.28 |
| ECS Fargate | Tarefa Fargate | 256 CPU units, 512MB memória | $0.011664 | $8.51 |
| OpenSearch | t3.small.search | 1 instância, 10GB EBS | $0.036 | $26.28 |
| ElastiCache | cache.t4g.micro | 1 instância, Redis | $0.016 | $11.68 |
| CloudFront | Distribuição | Classe de preço: PriceClass_100 | Variável* | ~$0.085/GB transferência |
| NAT Gateway | NAT Gateway | Implantado em zonas de disponibilidade | $0.045 + $0.045/GB transferência | $32.85 + transferência de dados |
| S3 | Standard + Lifecycle | Bucket para dados com lifecycle para IA e Glacier | $0.023/GB | Variável com base no uso |
| CloudWatch | Logs e métricas | Para ECS, RDS e OpenSearch | $0.50/GB ingestão | Variável com base no uso |

## Custo fixo total mensal (estimado)

Custo base total (excluindo custos variáveis): **$178.60 USD/mês**

## Detalhes por recurso

### RDS MySQL (db.t4g.small)
- **Tipo**: Base de dados relacional MySQL
- **Configuração**: Multi-AZ para alta disponibilidade (2 instâncias)
- **Armazenamento**: 50GB
- **Observações**: Configurado com backup retenção de 30 dias, storage encriptado
- **Custo por hora**: $0.136 (2 instâncias devido ao Multi-AZ)
- **Custo mensal**: $99.28

### ECS Fargate
- **Tipo**: Serviço de contêineres serverless
- **Configuração**: 256 CPU units, 512MB memória
- **Observações**: Executando em subnets privadas
- **Custo por hora**: $0.011664
- **Custo mensal**: $8.51

### OpenSearch
- **Tipo**: Serviço de busca e análise
- **Configuração**: t3.small.search, 1 instância, 10GB EBS
- **Observações**: Com encriptação em repouso e entre nós
- **Custo por hora**: $0.036
- **Custo mensal**: $26.28

### ElastiCache Redis
- **Tipo**: Serviço de cache em memória
- **Configuração**: cache.t4g.micro, 1 instância
- **Observações**: Com encriptação em trânsito e autenticação
- **Custo por hora**: $0.016
- **Custo mensal**: $11.68

### NAT Gateway
- **Tipo**: Gateway para acesso à internet de subnets privadas
- **Observações**: Necessário para que os contêineres Fargate acessem a internet
- **Custo por hora**: $0.045
- **Custo mensal**: $32.85 + custos de transferência de dados

### CloudFront
- **Tipo**: CDN para distribuição de conteúdo
- **Configuração**: Configurado para distribuir o conteúdo do frontend
- **Observações**: O custo varia com base no tráfego e localização dos usuários
- **Custo**: ~$0.085/GB para transferência na América do Norte/Europa (PriceClass_100)

### S3
- **Tipo**: Armazenamento de objetos para frontend e dados
- **Configuração**: Ciclo de vida configurado para mover dados antigos para classes de armazenamento mais baratas
- **Observações**: Custo varia com base no volume de dados e padrões de acesso
- **Custo**: Standard: $0.023/GB, STANDARD_IA: $0.0125/GB, Glacier: $0.004/GB

## Observações sobre custos

1. Os custos são estimativas baseadas nos preços da AWS na região us-east-1.
2. Custos de transferência de dados não estão totalmente incluídos e dependem do uso real.
3. Esta estimativa não considera descontos por compromisso (Savings Plans ou Reserved Instances).
4. Recursos no Free Tier da AWS não foram considerados no custo total.
5. O custo real pode variar com base na utilização efetiva, região e outros fatores. 