import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/prescricao",
});

export async function postCalculoPrescricao(data: any) {
  const response = await api.post("/calcular", data);
  return response.data;
}
