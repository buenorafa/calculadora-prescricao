// src/context/user-context.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect, // ✅ importe o hook correto
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Usuario } from "@/types/usuario";

type UserContextType = {
  usuario: Usuario | null;
  carregando: boolean;
  erro?: string | null;
  atualizarUsuarioLocal: (u: Usuario | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const bootstrappedRef = useRef(false);

  // ✅ Hidrata do localStorage e encerra o carregamento
  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;

    try {
      const raw = localStorage.getItem("usuario");
      if (raw) {
        const u: Usuario = JSON.parse(raw);
        setUsuario(u);
      }
    } catch (e) {
      setErro("Falha ao ler usuário salvo");
    } finally {
      setCarregando(false); // MUITO IMPORTANTE
    }
  }, []);

  function atualizarUsuarioLocal(u: Usuario | null) {
    setUsuario(u);
    if (u) localStorage.setItem("usuario", JSON.stringify(u));
    else localStorage.removeItem("usuario");
  }

  return (
    <UserContext.Provider
      value={{ usuario, carregando, erro, atualizarUsuarioLocal }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return ctx;
}

// ❌ Removido: NÃO declare sua própria função useEffect aqui
