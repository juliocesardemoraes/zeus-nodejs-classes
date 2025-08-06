import express from "express";
import cors from "cors";
import User from "./database/models/user.js";
import connectToDatabase from "./database/config.js";

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  res.status(200).send({ working: true });
});

app.get("/users", async (request, response) => {
  const users = await User.find({});
  return response.status(200).send({ working: true, users });
});

app.post("/users", async (request, response) => {
  const users = await User.create({
    name: "Júlio Teste",
    password: "123",
  });
  return response.status(201).send({ working: true, users });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
