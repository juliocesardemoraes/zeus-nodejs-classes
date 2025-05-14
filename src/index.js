import express from "express";
import { nameRouter } from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

app.put("/update-user", (request, response) => {
  const body = request.body;
  return response.status(200).send({ message: "user updated" });
});

app.patch("/update-user", (request, response) => {
  const body = request.body;
  return response.status(200).send({ message: "user partially updated" });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
