import express from "express";
import { nameRouter } from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

app.use("/name", nameRouter);

const PORT = 3001;

// Eu crio um mock(valores falsos):
const usersMock = [
  {
    id: 1,
    name: "Lucas Silva",
    email: "lucas.silva@example.com",
    birthdate: "1990-05-12",
    address: "Rua das Flores, 123, São Paulo - SP",
    active: true,
  },
  {
    id: 2,
    name: "Mariana Oliveira",
    email: "mariana.oliveira@example.com",
    birthdate: "1988-10-25",
    address: "Avenida Atlântica, 456, Rio de Janeiro - RJ",
    active: false,
  },
  {
    id: 3,
    name: "João Pereira",
    email: "joao.pereira@example.com",
    birthdate: "1995-07-03",
    address: "Rua Belo Horizonte, 789, Belo Horizonte - MG",
    active: true,
  },
  {
    id: 4,
    name: "Ana Souza",
    email: "ana.souza@example.com",
    birthdate: "1992-02-17",
    address: "Rua Curitiba, 101, Curitiba - PR",
    active: false,
  },
  {
    id: 5,
    name: "julio",
    email: "jcmcf2@gmail.com",
    birthdate: "1992-02-17",
    address: "Rua Curitiba, 101, Curitiba - PR",
    active: false,
  },
];

// E uso isso no lugar(testando a funcionalidade)
app.get("/users", (request, response) => {
  console.log(request.query);
  console.log(request.query.name);
  console.log(request.query.email);
  let user = null;

  for (let i = 0; i < usersMock.length; i++) {
    if (request.query.name === usersMock[i].name) user = usersMock[i];
  }

  // localhost:3001/users?name=julio&email=jcmcf2@gmail.com

  response.json(user);
});

app.get("/users/:id", (request, response) => {
  console.log(request.params.id); // "3"
  let user = null;
  const id = Number(request.params.id);

  // === valor e tipo de variável
  // == valor

  for (let i = 0; i < usersMock.length; i++) {
    if (usersMock[i].id == id) {
      user = usersMock[i];
    }
  }

  return response.status(200).send(user);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
