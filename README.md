# DTOS

# Data Transfer Object

- Trafegar dados entre os limites arquiteturais;
- Objeto anêmico, sem comportamento;
- Contém dados (input ou output)
- Não possui regras de negócio
- Não possui comportamento
- não faz nada

- API -> CONTROLLER -> USE CASE -> ENTITY
- Controller cria um DTO com os dados recebidos e envia para o UseCase
- Use Case executa seu fluxo, pega o resultado, cria um DTO para output e retorna para o Controller
- Logo é um _dumb object_

---

# Entities vs DDD

- Entities da Clean Arch <> Entities do DDD;
- Clean arch define Entity como camada de regras de negócio;
- Elas sem aplicam em qualquer situação;
- Não há definição explícita de como criar as entities;
- Normalmente utilizamos táticas do DDD;
- Entities = Agregados + Domain Services

---

# Input vs Output

- No final do dia, tudo se resume a um Input que retorna um Output
- e.g Criar um pedido (dados do pedido == input)
  Pedido criado (dados de retorno do pedido)
- Simplifique seu raciocínio ao criar um software sempre pensando em Input e Output

# Limites Arquiteturais

Tudo que não impacta diretamente nas regras de negócio devem estar em um limite arquitetural diferente.
e.g Não será o front-end, banco de dados que mudarão as regras de negócio da aplicação.

---

# Pontos importantes sobre a Arquitetura

- Formato que o software terá;
- Divisão de componentes;
- Comunicação entre componentes;
- Uma boa arquitetura vai facilitar o processo de desenvolvimento, deploy, operação e manutenção;

> The strategy behind that facilitation is to leave as many options open as possible,
> fot as long as possible.
>
> - C. Martin Robert, Clean Architecture.

---

# Objetivos de uma boa arquitetura

> O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema. Uma boa arquitetura torna o sistema fácil de entender, fácil de desenvolver, fácil de manter e fácil de implantar. O objetivo final é minimizar o custo de vida útil do sistema e maiximizar a produtividade do programador.
> C, Martin Robert, Clean Architecture

---

# Regras vs Detalhes

- Regras de negócio trazem o real valor para o software;
- Detalhes ajudam a suportar as regras;
- O que realmente trás valor para o seu software SÃO AS REGRAS DE NEGÓCIO;
- Detalhes não devem impactar nas regras de negócio;
- Frameworks, banco de dados, apis, não devem impactar as regras;

---

# Presenters

- Obejtos de transformação;
- Adequa o DTO de output no formato correto para entregar o resultado
- Lembrando: Um sistema por ter diversos formatos de entrega: EX: XML, JSON, Protobuf, GraphQL, CLI, etc.

```
Input =  new CategoryInputDTO("name_category");
output : CategoryOutputDTO =  CreateCategoryUseCase.execute(Input);

json_result =  CategoryPresenter(output).to_json();
xml_result =  CategoryPresenter(output).to_xml();
```

---

- Intenção, cada intenção é um caso de uso, e cada usecase é uma ação
- Clareza de cada comportamento do software
- Detalhes não devem impactar nas regras de negócio
- Frameworks, banco de dados e etc.. não devem impactar as regras de negócios

---

# Use Cases - SRP

- Temos a tendência de "reaproveitar" usecases por serem muito parecidos.
- e.g Alterar vs Inserir. Ambos consultam se o registro existe, persistem dados. MAS são usecases difrentes. Por que ?
- SRP (Single Resposability Principle) => Mudam por razões diferentes.

---
