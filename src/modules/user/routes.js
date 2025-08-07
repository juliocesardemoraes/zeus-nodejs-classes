import { Router } from "express";
import User from "./models/user.js";

const userRouter = Router();

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  return response.status(200).send({ working: true, users });
});

export { userRouter };
