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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
