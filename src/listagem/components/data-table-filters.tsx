"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  table: any; // Adjust this type based on your table implementation
  clearFilters: () => void;
}

export function DataTableFilters({
  globalFilter,
  setGlobalFilter,
  table,
  clearFilters,
}: DataTableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <Input
        placeholder="Buscar por nome"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-1/3"
      />

      {/* <Select
        value={(table.getColumn("perfil")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table
            .getColumn("perfil")
            ?.setFilterValue(value === "__all__" ? undefined : value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">Todos os Perfis</SelectItem>
          <SelectItem value="associado">Associado</SelectItem>
          <SelectItem value="acolhimento">Acolhimento</SelectItem>
          <SelectItem value="farmácia">Farmácia</SelectItem>
          <SelectItem value="diretoria">Diretoria</SelectItem>
          <SelectItem value="médico">Médico</SelectItem>
        </SelectContent>
      </Select> */}

      <Select
        value={(table.getColumn("tipoPrescricao")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table
            .getColumn("tipoPrescricao")
            ?.setFilterValue(value === "__all__" ? undefined : value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">Todos os Tipos</SelectItem>
          <SelectItem value="ABSTRATA">ABSTRATA</SelectItem>
          <SelectItem value="CONCRETA">CONCRETA</SelectItem>
          <SelectItem value="RETROATIVA">RETROATIVA</SelectItem>
          <SelectItem value="INTERCORRENTE">INTERCORRENTE</SelectItem>
        </SelectContent>
      </Select>

      {/* <Select
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table
            .getColumn("status")
            ?.setFilterValue(value === "__all__" ? undefined : value)
        }
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">Todos os Status</SelectItem>
          <SelectItem value="ativo">Ativo</SelectItem>
          <SelectItem value="documentação pendente">
            Documentação Pendente
          </SelectItem>
          <SelectItem value="receita vencida">Receita Vencida</SelectItem>
          <SelectItem value="mensalidade pendente">
            Mensalidade Pendente
          </SelectItem>
          <SelectItem value="inativo">Inativo</SelectItem>
        </SelectContent>
      </Select> */}

      <Button variant="outline" onClick={clearFilters}>
        Limpar filtros
      </Button>
    </div>
  );
}
