import express from "express";
import { nameRouter } from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

app.use("/name", nameRouter);

app.post("/validate-password", (request, response) => {
  const body = request.body;

  if (body.password.length >= 6) {
    return response.status(200).send({ message: "Senha válida" });
  } else {
    return response.status(400).send({ message: "Senha inválida" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
