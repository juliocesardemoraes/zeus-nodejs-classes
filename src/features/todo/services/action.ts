import { axiosInstance } from "@/lib/config";
import { ITodo } from "../config/types";

const getTodos = async () => {
  const { data } = await axiosInstance.get("/todos");
  console.log("DATA", data);
  return data.todos;
};

const postTodo = async (todo: Pick<ITodo, "title">) => {
  const { data } = await axiosInstance.post("/todos", todo);
  console.log("DATA", data);
  return data;
};

export { getTodos, postTodo };
