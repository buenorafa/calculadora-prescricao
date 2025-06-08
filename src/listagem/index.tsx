"use client";

import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { mockData } from "./mock";

export default function ListagemPage() {
  return <DataTable columns={columns} data={mockData} />;
}
