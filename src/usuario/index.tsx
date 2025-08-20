// src/pages/usuario/UsuarioPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUser } from "@/context/usuario-context";
import { putUsuario } from "@/service/api";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const editSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Informe um email válido."),
});
type EditFormData = z.infer<typeof editSchema>;

export default function UsuarioPage() {
  const navigate = useNavigate();
  const { usuario, carregando, atualizarUsuarioLocal } = useUser();

  const [abrirDialog, setAbrirDialog] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // ✅ Guard: se não autenticado, manda para login
  useEffect(() => {
    if (usuario)
      if (!usuario) {
        navigate("/login", { replace: true });
      }
  }, [carregando, usuario, navigate]);

  // ❌ Removido: não grave mais fake user no localStorage aqui.
  // Se quiser testar sem backend, faça:
  // useEffect(() => {
  //   atualizarUsuarioLocal({ id: 1, nome: "Usuário Teste", email: "teste@example.com" });
  // }, []);

  const form = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      nome: usuario?.nome ?? "",
      email: usuario?.email ?? "",
    },
    values: {
      nome: usuario?.nome ?? "",
      email: usuario?.email ?? "",
    },
    mode: "onBlur",
  });

  async function onSubmitEdit(values: EditFormData) {
    if (!usuario) return;
    setSalvando(true);
    setErro(null);
    try {
      // ✅ usa seu service (com CSRF/withCredentials)
      const atualizado = await putUsuario(usuario.id, values);
      // ✅ atualiza contexto (ele mesmo sincroniza localStorage, se seu provider fizer isso)
      atualizarUsuarioLocal(atualizado);
      setAbrirDialog(false);
    } catch (e: any) {
      setErro(e.message ?? "Não foi possível atualizar o usuário.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold leading-tight">
              {usuario.nome}
            </h1>
            <p className="text-sm text-muted-foreground">{usuario.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setAbrirDialog(true)}>
              Editar perfil
            </Button>
            <Button variant="destructive" onClick={console.log}>
              Sair
            </Button>
          </div>
        </header>

        <Separator />

        <Card className="p-6 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">
              ID do usuário
            </Label>
            <div className="text-sm">{usuario.id}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome</Label>
              <div className="text-sm">{usuario.nome}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">E-mail</Label>
              <div className="text-sm">{usuario.email}</div>
            </div>
          </div>
        </Card>

        <Card className="px-6 py-8">
          <div className="flex text-black flex-row text-center gap-10 font-semibold items-center text-4xl justify-between">
            <div className="bg-white relative rounded-md w-64 min-h-36 hover:brightness-90 shadow-lg items-center p-6">
              <Link
                to="/"
                className="flex flex-col h-full w-full text-center items-center justify-center"
              >
                <i className="absolute top-20 text-5xl fa-solid fa-calculator"></i>
                <p>Calculadora</p>
              </Link>
            </div>
            <div className=" bg-[#e6ede5] relative rounded-md w-64   min-h-36   hover:brightness-90 shadow-lg p-6">
              <Link
                to="/listagem"
                className="flex h-full w-full text-center items-center justify-center"
              >
                <i className="absolute top-20 text-5xl fa-solid  fa-balance-scale"></i>
                <p>Listagem</p>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={abrirDialog} onOpenChange={setAbrirDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
          </DialogHeader>

          {erro && (
            <div className="text-sm text-red-600 border border-red-200 rounded-md p-3 mb-2">
              {erro}
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitEdit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="voce@exemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 flex gap-2">
                <Button type="submit" disabled={salvando} className="flex-1">
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAbrirDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
