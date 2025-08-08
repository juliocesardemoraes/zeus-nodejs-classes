import { axiosInstance } from "@/lib/config";

const getTodos = async () => {
  const { data } = await axiosInstance.get("/todos");
  console.log("DATA", data);
  return data;
};

export { getTodos };
