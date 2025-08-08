import { Router } from "express";
import Todo from "./models/todo.js";

const todoRouter = Router();

todoRouter.get("/", async (request, response) => {
  const todos = await Todo.find({});
  return response.status(200).send({ working: true, todos });
});

todoRouter.post("/", async (request, response) => {
  const data = { ...request.body, userId: "6895f2bc886abd18a759038c" };

  const todos = await Todo.create(data);
  return response.status(201).send({ working: true, todos });
});

export { todoRouter };
