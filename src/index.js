import express from "express";
import { nameRouter } from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

let users = [
  { id: 1, name: "Ana", age: 25, password: "admin12345" },
  { id: 2, name: "Carlos", age: 30, password: "adm1234" },
];

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

app.get("/users", (request, response) => {
  response.status(200).send(users);
});

app.patch("/users/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  console.log(body);
  console.log(id);

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i] = { ...users[i], ...body };
    }
  }

  response.status(200).send(users);
});

app.put("/users/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i] = { ...users[i], ...body };
    }
  }

  response.status(200).send(users);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
