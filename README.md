## Investimentos API

Essa aplicação foi desenvolvida durante o desafio prático do processo seletivo da empresa XPInc. <br><br>
A proposta foi desenvolver uma aplicação de investimento em ações que promove a interação de compra e venda de ativos entre cliente e corretora.<br>

Para acessar a aplicação, siga as instruções do 'Rodando com Docker'.


👉🏻 ⚠️ **Também, nessa aplicação, foi criada uma API externa que retorna a cotação dos ativos e que pode ser acessada através do link: [assets-api](https://github.com/isabeladearo/assets-api).**


##

<details>
<summary><strong>Rodando no Docker</summary></strong><br>

  **Para rodar a API localmente utilizando Docker, certifique-se de ter o Docker e o Docker-Compose instalados em sua máquina.**
  1. Clone o repositório 
  * `git clone git@github.com:isabeladearo/investments-api.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd investments-api`
  2. Suba a orquestração de containers
   * `docker-compose --env-file .env  up -d`<br><br>
  **OBS**: O docker está usando as variáveis de ambiente do arquivo `.env`. Crie um novo arquivo `.env` e siga o exemplo do arquivo `.env.example`.
  3. A aplicação estará pronta para uso quando a saída no seu terminal ficar assim:
  ```bash
  Creating investments_db ... done
  Creating investments_api ... done
  ```
  4. Rode o container via CLI:
  * Utilize o comando `docker exec -it investments_api bash`
  5. Crie a tabelas no banco de dados:
  * `npm run prestart`
  6. Popule o banco de dados:
  * `npm run seed`
  7. Rode a aplicação:
  * `npm run start`
  8. A aplicação poderá ser acessada através do seu navegador:
  * `http://localhost:3000/docs/`

</details>


##
### Documentação da API

<img width="887" alt="swagger-image" src="https://user-images.githubusercontent.com/92924409/180669733-5050e880-ab90-40d7-9c5e-4d27dd1bb691.png">

A documentação da aplicação foi feita utilizando [Swagger](https://swagger.io/), e pode ser consultada através do endpoint /docs.
Dessa forma será possível simular todas as rotas e entender os retornos sem nenhuma dificuldade de configuração.

**OBS**: Em algumas rotas, uma API está sendo chamada para fazer a cotação dos ativos. Na primeira solicitação, a API pode demorar um pouco para responder pois o servidor está no estado 'sleeping'.

##

### Estrutura do banco de dados

<img width="800" alt="estrutura-banco-de-dados" src="https://user-images.githubusercontent.com/92924409/180668068-aa1769d0-4e4b-4fbd-958b-4fc455881d0f.png">

##

### Tecnologias e bibliotecas utilizadas
  - Javascript
  - Nodejs
  - Docker
  - Dotenv
  - Eslint
  - Express
  - Joi
  - JWT
  - Mysql
  - Nodemon
  - Sequelize
  - Swagger
  
  
  
  
