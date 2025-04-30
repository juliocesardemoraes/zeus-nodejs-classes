import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.status(200).send("Olá mundo");
});

app.get("/name", (request, response) => {
  response.status(200).send("Júlio Moraes");
});

const PORT = 3000;

// localhost:3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
