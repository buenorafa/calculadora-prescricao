// src/api/api.ts
import axios, { AxiosError } from "axios";
import type { Usuario } from "@/types/usuario";
import type { Prescricao, PrescricaoSaveDTO } from "@/types/prescricao";

/**
 * Se usar proxy do Vite, pode trocar para baseURL: "/"
 * e configurar o proxy em vite.config.ts.
 */
const BASE_URL = "";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies (JSESSIONID/XSRF-TOKEN)
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export const api_prescricao = axios.create({
  baseURL: "/prescricao", // relativa → proxy do Vite
  withCredentials: true, // manda JSESSIONID
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// ---- Interceptores (logs e mensagens) ----
api.interceptors.response.use(
  (resp) => resp,
  (err: AxiosError<any>) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Erro inesperado";
    return Promise.reject(new Error(msg));
  }
);

// (Opcional) logs de request/response em DEV
if (import.meta?.env?.MODE !== "production") {
  api.interceptors.request.use((cfg) => {
    console.log(
      "➡️",
      cfg.method?.toUpperCase(),
      `${api.defaults.baseURL}${cfg.url}`
    );
    console.log("Headers:", cfg.headers);
    console.log("Body:", cfg.data);
    return cfg;
  });
  api.interceptors.response.use(
    (res) => {
      console.log("✅", res.status, res.config.url, res.data);
      return res;
    },
    (err) => {
      console.error(
        "❌",
        (err as AxiosError).response?.status,
        (err as AxiosError).response?.data
      );
      console.error(err);
      return Promise.reject(err);
    }
  );
}
function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  // sempre mande JSON no POST
  if (
    config.method &&
    ["post", "put", "patch", "delete"].includes(config.method)
  ) {
    (config.headers as any)["Content-Type"] = "application/json";
  }
  // injeta o XSRF do cookie
  const token = getCookie("XSRF-TOKEN");
  if (token) {
    (config.headers as any)["X-XSRF-TOKEN"] = token;
  }
  return config;
});

// ---- CSRF: garanta o cookie XSRF-TOKEN uma vez antes de POST/PUT/PATCH/DELETE ----
let csrfEnsured = false;
export async function ensureCsrfOnce() {
  if (document.cookie.includes("XSRF-TOKEN=")) return;
  await api.get("/public/ping"); // emite o cookie XSRF-TOKEN
  csrfEnsured = true;
}

// Utilitário para requests que mudam estado (garante CSRF e Content-Type)
async function mutate<T>(fn: () => Promise<{ data: T }>): Promise<T> {
  await ensureCsrfOnce();
  return (await fn()).data;
}

// =====================================================================================
//                                    PRESCRIÇÃO
// =====================================================================================

// export async function postCalculoPrescricao(payload: unknown) {
//   return mutate(() =>

//     api.post("/prescricao/calcular", payload, {
//       headers: { "Content-Type": "application/json" },
//     })
//   );
// }
export async function postCalculoPrescricao(payload: any) {
  await ensureCsrfOnce();

  return api
    .post("/prescricao/calcular", payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
}

export async function postSalvarPrescricao(dados: any) {
  await ensureCsrfOnce();

  return api
    .post("/prescricao/salvar", dados, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
}

export async function getPrescricoesPorUsuario(
  usuarioId: number
): Promise<Prescricao[]> {
  const { data } = await api.get<Prescricao[]>(
    `/prescricao/listar/${usuarioId}`
  );
  return data;
}

// =====================================================================================
//                                      USUÁRIO
// =====================================================================================

export async function postUsuario(body: {
  nome: string;
  email: string;
  senha: string;
}) {
  await ensureCsrfOnce();
  const { data } = await api.post("/usuarios", body, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function putUsuario(
  usuarioId: number,
  usuarioAtualizado: Omit<Usuario, "id">
): Promise<Usuario> {
  return mutate(() =>
    api.put<Usuario>(`/usuarios/${usuarioId}`, usuarioAtualizado, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

export async function deleteUsuario(usuarioId: number): Promise<boolean> {
  await ensureCsrfOnce();
  const resp = await api.delete(`/usuarios/${usuarioId}`);
  return resp.status === 204; // backend retorna 204 No Content
}

// =====================================================================================
//                                      AUTH
// =====================================================================================

type LoginResponse = {
  status: string; // "OK"
  usuario: Usuario; // { id, nome, email }
};

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  await ensureCsrfOnce(); // garante XSRF-TOKEN no header

  const response = await api.post(
    "/api/auth/login",
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function logout(): Promise<void> {
  await mutate(() =>
    api.post("/api/auth/logout", null, {
      headers: { "Content-Type": "application/json" },
    })
  );
}

// Usuário autenticado atual (usa sessão)
export async function me(): Promise<Usuario> {
  const { data } = await api.get<Usuario>("/api/me");
  return data;
}
