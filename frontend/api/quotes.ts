import axios from "axios";

export const getQuotes = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quotes`);

  return response.data;
};

export const getQuoteById = async (id: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/quotes/${id}`
  );

  return response.data;
};
