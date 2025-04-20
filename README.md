# 🛫 Airport API

API RESTful desenvolvida com **Node.js**, **Express**, **TypeScript** e **TypeORM**, utilizando **SQLite** como banco de dados. Essa aplicação permite o gerenciamento de aviões, voos e fluxo de caixa de um aeroporto fictício.

---

## ✨ Funcionalidades

✅ Cadastro e listagem de aviões

✅ Registro de voos com status e relação com aviões

✅ Controle de fluxo de caixa (entradas e saídas)

✅ Relacionamentos entre entidades com TypeORM

✅ Banco de dados SQLite embutido

✅ Estrutura organizada e pronta para deploy

✅ CRUD completo de passageiros

✅ Emissão e gestão de tickets de voo

✅ Consulta de tickets por passageiro e por voo

✅ Cadastro e gerenciamento de aeroportos

✅ Associação de voos com aeroportos de origem/destino

✅ Cadastro de funcionários e filtro por cargo

✅ Validação de dados com Zod

✅ API RESTful estruturada com rotas bem definidas

✅ Separação clara entre camadas (controller, service, entity)

✅ Utilização de middlewares para tratamento de erros



---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)

---

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/reinaldoper/airport-api.git
cd airport-api
&& 
npm install
```


2. Rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

3. O servidor estará rodando em:

- 👉 http://localhost:3000/api

---

## 📄 Exemplos de Entidades

🔗 Endpoints
- Todas as rotas abaixo devem ser prefixadas com /api, ex: http://localhost:3000/api/planes

---

1. 🛫 Airports

- Método	Rota	Descrição
- POST	/api/	Criar novo aeroporto
- GET	/api/	Listar todos os aeroportos
- GET	/api/:id	Buscar aeroporto por ID
- PUT	/api/:id	Atualizar aeroporto por ID
- DELETE	/api/:id	Deletar aeroporto por ID

---

2. ✈️ Planes

- Método	Rota	Descrição
- POST	/api/planes	Criar novo avião
- GET	/api/planes	Listar todos os aviões
- GET	/api/planes/:id	Buscar avião por ID
- PUT	/api/planes/:id	Atualizar avião por ID
- DELETE	/api/planes/:id	Deletar avião por ID

---


3. 👤 Passengers

- Método	Rota	Descrição
- POST	/api/	Criar passageiro
- GET	/api/	Listar todos os passageiros
- GET	/api/:id	Buscar passageiro por ID
- PUT	/api/:id	Atualizar passageiro por ID
- DELETE	/api/:id	Deletar passageiro por ID

---


4. 🧾 Tickets

- Método	Rota	Descrição
- POST	/api/	Criar novo ticket
- GET	/api/	Listar todos os tickets
- GET	/api/:id	Buscar ticket por ID
- PUT	/api/:id	Atualizar ticket por ID
- DELETE	/api/:id	Deletar ticket por ID
- GET	/api/flight/:id	Buscar tickets por ID do voo
- GET	/api/passenger/:id	Buscar tickets por ID do passageiro

---


5. 🛩️ Flights

- Método	Rota	Descrição
- GET	/api/	Listar todos os voos
- GET	/api/:id	Buscar voo por ID
- POST	/api/	Criar novo voo
- PUT	/api/:id	Atualizar voo por ID
- DELETE	/api/:id	Deletar voo por ID
- GET	/api/airport/:id	Buscar voos por ID do aeroporto

---


6. 👨‍✈️ Employees

- Método	Rota	Descrição
- GET	/api/	Listar todos os funcionários
- GET	/api/:id	Buscar funcionário por ID
- GET	/api/role/:role	Buscar funcionários por cargo (role)
- POST	/api/	Criar funcionário
- PUT	/api/:id	Atualizar funcionário por ID
- DELETE	/api/:id	Deletar funcionário por ID

---

7. 💰 Cash Flow

- Método	Rota	Descrição
- POST	/api/cashFlow	Criar entrada/saída de caixa
- GET	/api/cashFlow	Histórico de fluxo de caixa
- GET	/api/cashFlow/:id	Buscar registro de caixa por ID
- PUT	/api/cashFlow/:id	Atualizar registro de caixa por ID
- DELETE	/api/cashFlow/:id	Deletar registro de caixa por ID
- DELETE	/api/cashFlow	Deletar todos os registros de caixa

---

## 📌 Observações

- A aplicação está conectada a um banco SQLite salvo em ./src/database/airport.sqlite.

- A sincronização está habilitada para desenvolvimento (synchronize: true), mas deve ser desativada em produção.

- O campo status de aviões e voos aceita valores específicos para controle interno.