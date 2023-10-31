<div align="center">
  <img alt="Desafio Full-stackt" title="Desafio Full-stack" src="https://garantia.inmediam.com.br//assets/logoInmediamCores-bc0eeaaa.svg" width="20%" />
</div>
<h1 align="center">
    Desafio Full-stack
</h1>

<p align="center">
  <a href="#tarefas">Tarefas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configuração-do-ambiente">Configuração do ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#extras">Extras</a>
</p>

Esse sistema gere as assinaturas de um serviço.

O usuário, logado no sistema, pode contratar um plano, que dá direito a um número de cotas de um produto e a uma quantidade de armazenamento em HD.

Para simplificar, nesse exercício não foi desenvolvida a parte de login e autenticação, assim, pode considerar que o usuário está sempre logado.

O usuário inicialmente não tem nenhum plano contratado. Ele pode contratar um dos planos e "pagar" na hora com um "pix". Para esse exercício, basta que haja um botão "pagar" e que a contratação se concretize no banco de dados.

O pagamento de cada plano é mensal. A data de pagamento é sempre o mesmo dia do mês em que ele fez a contratação.

Uma vez contratado, o usuário pode trocar de plano. Nesse ponto, ele já realizou um pagamento para iniciar a assinatura; quando ele troca de plano, aquele pagamento que ele fez será convertido em créditos de acordo com a quantidade de dias que ele já usou do plano anterior, e o crédito será aproveitado no próximo plano.

Lembrando que ele pode trocar para um plano mais caro, ou um plano mais barato.

As contratações de plano que o usuário vai realizando deverão ser armazenadas numa tabela `contracts` no banco de dados. Essa tabela deve estar relacionada à tabela `users`. Cada usuário pode ter vários contratos, mas apenas um contrato de cada usuário pode ser considerado "ativo". Quando ele troca de plano, o contrato anterior deve ser desativado (nunca apagado) e o novo contrato será marcado como ativo. Deve haver uma forma fácil da api retornar o contrato ativo.

Cada pagamento que o usuário faz será armazenado numa tabela `payments`. Cada pagamento pertence a um contrato. Quando o usuário troca de plano, e o novo contrato é criado, será criada um ou mais pagamentos pendentes, dependendo do crédito que o usuário tinha e do valor do novo plano que ele escolheu.

## Tarefas:

- Exibição dos dados do usuário (não é necessário autenticação);
- Exibição de todos os planos cadastrados no banco de dados (siga como exemplo o print abaixo);
- Seleção e assinatura do plano com pagamento fictício (tipo Pix);
- Alteração de plano para o caso do usuário já ter realizado uma assinatura.

## 🔧 Configuração do ambiente

### Frontend

Projeto React criado com Vite, utilizando Typescript.

#### Iniciando:

1. `npm install`
2. Copie o arquivo `.env.example` para `.env` e modifique se necessário
3. `npm run dev`

### DB

Banco de dados Postgresql em docker, pronto para ser utilizado no Desafio.

#### Iniciando:

`docker compose up`

### Api:

- Essa api será usada no Desafio Fullstack de troca de plano.
- Depende de um banco de dados Postgresql.
- Essa api não tem a parte de login, para simplificar o exercício.

#### Iniciando:

1. Copie o arquivo `.env.example` para `.env` e modifique se necessário
2. `composer Install`
3. `php artisan key:generate`
4. `php artisan migrate`
5. `php artisan db:seed`
6. Executar com o comando: `php artisan serve`

### Rotas já criadas:

1. /api/plans - Retorna a lista de planos
2. /api/user - Retorna o usuário "logado"

## Extras:

- Exibir o histórico dos planos assinados pelo usuário, com os seguintes dados: <br/>
  > descrição do plano  
  > valor  
  > desconto  
  > data de pagamento
- Utilizar o pré-processador de CSS Tailwind;
- Estrutura de pastas e organização do código;
- Utilização e criação de Hooks;
- Utilizar Typescript corretamente;
- Seguir os padrões do Laravel sempre que possível, especialmente na criação de: Rotas, Migrations, Models, Controllers;
- Seguir o padrão REST para as rotas da API.
