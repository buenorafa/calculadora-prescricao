// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LoginForm, type LoginFormData } from "./components/login-form";

import { api, ensureCsrfOnce, login, me } from "@/service/api"; // sua instância axios
import type { Usuario } from "@/types/usuario";

export default function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   import { useUser } from "@/context/user-context";
  //   const { setUsuarioLocal } = useUser();

  async function handleSubmit(data: LoginFormData) {
    setSubmitting(true);
    setError(null);
    console.log("ENTROU handlesubmit");
    try {
      await login(data.email, data.senha); // cria sessão
      //   const usuario = await me(); // hidrata usuário
      //   setUsuarioLocal(usuario);

      navigate("/usuario", { replace: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "E-mail ou senha inválidos.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta para continuar.
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <LoginForm onSubmit={handleSubmit} submitting={submitting} />

        <Separator className="my-2" />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Não tem conta?
            <Button
              variant="link"
              className="px-1"
              onClick={() => navigate("/cadastro")}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
