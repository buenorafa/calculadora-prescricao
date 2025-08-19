// src/pages/auth/CadastroPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CadastroForm,
  type CadastroFormData,
} from "./components/cadastro-form";
import { ensureCsrfOnce, postUsuario } from "@/service/api";

export default function CadastroPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CadastroFormData) {
    setSubmitting(true);
    setError(null);

    try {
      console.log(data);
      await ensureCsrfOnce();
      await postUsuario(data);
      navigate("/login", { replace: true });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha seus dados para continuar.
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <CadastroForm onSubmit={handleSubmit} submitting={submitting} />

        <Separator className="my-2" />

        <div className="text-sm text-muted-foreground">
          Já possui conta?
          <Button
            variant="link"
            className="px-1"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
        </div>
      </Card>
    </div>
  );
}
