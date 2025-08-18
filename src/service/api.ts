// import { ResultadoCalculo } from "./../types/resultado-calculo";
import { type Usuario } from "@/types/usuario";
import axios from "axios";
import type { Prescricao, PrescricaoSaveDTO } from "../types/prescricao";

export const api_prescricao = axios.create({
  baseURL: "http://localhost:8080/prescricao",
});
export const api_usuario = axios.create({
  baseURL: "http://localhost:8080/usuarios",
});

export async function postCalculoPrescricao(data: any) {
  const response = await api_prescricao.post("/calcular", data);
  return response.data;
}

export async function postSalvarPrescricao(
  dadosDaPrescricao: PrescricaoSaveDTO
): Promise<Prescricao> {
  // Faz a requisição POST para o endpoint /salvar
  // O segundo argumento do 'api_prescricao.post' é o corpo (body) da requisição
  const response = await api_prescricao.post("/salvar", dadosDaPrescricao);

  // Retorna os dados da resposta (o objeto Prescricao salvo)
  return response.data;
}

export async function getPrescricoesPorUsuario(usuarioId: number) {
  // A função chama o endpoint GET /listar/{id}
  const response = await api_prescricao.get(`/listar/${usuarioId}`);
  return response.data;
}

export async function postUsuario(novoUsuario: Omit<Usuario, "id">) {
  const response = await api_usuario.post("", novoUsuario);

  const data: Usuario = response.data;

  if (!data) {
    throw new Error("Erro ao cadastrar usuário");
  }

  return data;
}

export async function putUsuario(
  usuarioId: number,
  usuarioAtualizado: Omit<Usuario, "id">
) {
  const response = await api_usuario.put(`/${usuarioId}`, usuarioAtualizado);
  const data: Usuario = response.data;

  if (!data) {
    throw new Error("Erro ao cadastrar usuário");
  }

  return data;
}

export async function deleteUsuario(usuarioId: number) {
  const response = await api_usuario.delete(`/${usuarioId}`);

  return response.status === 204;
}
