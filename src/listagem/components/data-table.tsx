"use client";
import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTableFilters } from "./data-table-filters";
// import { UserDetailsDialog } from "./user-details-dialog";
import type { Consulta } from "./columns";
import { UserDetailsDialog } from "./user-details-dialog";

interface DataTableProps<TData extends Consulta, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Consulta, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const rowHeight = 48; // altura estimada de uma linha da tabela
    const headerHeight = 240; // altura estimada de filtros, headers, paddings etc.
    const screenHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const availableHeight = screenHeight - headerHeight;
    const estimatedRows = Math.floor(availableHeight / rowHeight);

    return {
      pageIndex: 0,
      pageSize: estimatedRows > 5 ? estimatedRows : 5, // mínimo de 5
    };
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<Consulta | null>(null);

  const table = useReactTable({
    data,
    columns,

    state: { pagination, columnFilters, globalFilter },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
  });

  const clearFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
  };

  return (
    <div className="space-y-4">
      <DataTableFilters
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        clearFilters={clearFilters}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => setSelectedPrescription(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>

      <UserDetailsDialog
        selectedPrescription={selectedPrescription}
        setSelectedPrescription={setSelectedPrescription}
      />
    </div>
  );
}
