import express from "express";
import { nameRouter } from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

const PORT = 3001;

const users = [
  { id: 1, name: "Ana", age: 25, password: "admin12345" },
  { id: 2, name: "Carlos", age: 30, password: "adm1234" },
];

app.get("/users", (request, response) => {
  return response.status(200).send(users);
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);

  let indexToDelete = null;

  for (let i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      indexToDelete = i;
    }
  }

  users.splice(indexToDelete, 1);

  //
  return response
    .status(200)
    .send({
      message: "user deleted!",
      messagept: "usuario deletado com sucesso!",
      users,
    });

  // 200
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
