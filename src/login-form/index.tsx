// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LoginForm } from "./components/login-form";

import { login } from "@/service/api"; // sua instância axios

import { useUser } from "@/context/usuario-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { atualizarUsuarioLocal } = useUser();
  async function handleSubmit(data: { email: string; senha: string }) {
    try {
      const resp = await login(data.email, data.senha);

      console.log("✅ Login response:", resp);

      // acessa o usuário
      const usuarioLogado = resp.usuario;

      atualizarUsuarioLocal(usuarioLogado);

      navigate("/usuario", { replace: true });
    } catch (err) {
      console.error("Erro no login:", err);
      setError("E-mail ou senha inválidos.");
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
