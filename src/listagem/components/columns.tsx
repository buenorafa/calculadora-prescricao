"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Associado = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  perfil: "associado" | "acolhimento" | "farmácia" | "diretoria" | "médico";
  tipo: "paciente" | "responsável" | "apoiador" | "pet";
  status:
    | "ativo"
    | "documentação pendente"
    | "receita vencida"
    | "mensalidade pendente"
    | "inativo";
};

export const columns: ColumnDef<Associado>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "perfil",
    header: "Perfil",
  },
  {
    accessorKey: "tipo",
    header: "Tipo de Associado",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
