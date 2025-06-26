"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { PrescricaoRequestDTO } from "../../types/prescricao";

export type Consulta = PrescricaoRequestDTO & {
  

};

export const columns: ColumnDef<Consulta>[] = [
    {
    accessorKey: "dataConsulta",
    header: "Data da Consulta",
  },
  {
    accessorKey: "nomeAcusado",
    header: "Nome",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "tipoPrescricao",
    header: "Tipo de Prescrição",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "pena",
    header: "Pena",
    enableGlobalFilter: true,
  },

  {
    accessorKey: "prazoPrescricional",
    header: "Data da Prescrição",
  },
];
