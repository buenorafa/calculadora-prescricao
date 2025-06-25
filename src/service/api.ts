import axios from "axios";
import type { Prescricao, PrescricaoSaveDTO } from "../types/prescricao";

export const api = axios.create({
  baseURL: "http://localhost:8080/prescricao",
});

export async function postCalculoPrescricao(data: any) {
  const response = await api.post("/calcular", data);
  return response.data;
}

export async function postSalvarPrescricao(dadosDaPrescricao: PrescricaoSaveDTO): Promise<Prescricao> {
  // Faz a requisição POST para o endpoint /salvar
  // O segundo argumento do 'api.post' é o corpo (body) da requisição
  const response = await api.post("/salvar", dadosDaPrescricao);
  
  // Retorna os dados da resposta (o objeto Prescricao salvo)
  return response.data;
}

export async function getPrescricoesPorUsuario(usuarioId: number) {
  // A função chama o endpoint GET /listar/{id}
  const response = await api.get(`/listar/${usuarioId}`);
  return response.data;
}