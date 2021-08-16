# MedClin 
Uma aplicação de agendamento de consultas

## Como iniciar 

### FrontEnd
- Primeiro abra um console no diretorio do front
- Use para instalar as dependencias do node:
`yarn`
- Depois use para instalar as dependencias do next:
`yarn next`
Ele ja vai iniciar, caso nao use:
`yarn dev`  

### Backend
- Crie um banco de dados `MySQL`  
- Use `yarn` para instalar as dependencias do node
- Configurar *Knex*:\
_Para conexão com banco de dados_ 
Entre no arquivo `knexfile.js`
 - host: '_O ip do banco de dados_'
 - databse: '_O nome do banco de dados_'
 - user: '_Usuario do banco de dados_'
 - password: '_Senha do banco de dados_'
- Rodar Migrates e Seeds
- Para rodar migrates: `yarn run knex migrate:latest`
- Para rodar seeds `yarn run knex seed:run`

Todos os usuarios registrados no banco tem a senha: 888888888
