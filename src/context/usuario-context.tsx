"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { Usuario } from "@/types/usuario";

interface UserContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<void>;
  cadastro: (usuario: Omit<Usuario, "id">) => Promise<void>;
  logout: () => void;
  carregando: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera usuário salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
    setCarregando(false);
  }, []);

  async function login(email: string, senha: string) {
    // Chamada ao backend (ajuste a URL para sua API Spring Boot)
    const resp = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!resp.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data: Usuario = await resp.json();
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  }

  async function cadastro(novoUsuario: Omit<Usuario, "id">) {
    const resp = await fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });

    if (!resp.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    const data: Usuario = await resp.json();
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <UserContext.Provider
      value={{ usuario, login, cadastro, logout, carregando }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
