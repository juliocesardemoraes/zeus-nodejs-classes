import express from "express";

const nameRouter = express.Router();

nameRouter.get("/", (request, response) => {
  response.status(200).send("Júlio Moraes");
});

export { nameRouter };
