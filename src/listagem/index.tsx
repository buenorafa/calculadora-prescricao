// src/listagem/index.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/usuario-context";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import type { Consulta } from "./components/columns";
import { getPrescricoesPorUsuario } from "@/service/api";

export default function ListagemPage() {
  const { usuario, carregando } = useUser();

  const [data, setData] = useState<Consulta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exemplo de mapeamento da resposta da API -> Consulta
  // Ajuste conforme os campos reais do seu backend e das suas colunas
  function mapToConsulta(apiItem: any): Consulta {
    return {
      // Exemplos de campos — substitua pelos nomes corretos:
      id: apiItem.id,
      processo: apiItem.processo ?? apiItem.numeroProcesso,
      crime: apiItem.crime ?? apiItem.tituloCrime,
      dataInicio: apiItem.dataInicio,
      dataFim: apiItem.dataFim,
      situacao: apiItem.situacao,
    } as Consulta;
  }

  useEffect(() => {
    // espera terminar a hidratação do contexto
    if (carregando) return;

    // se não logado, mostre mensagem/retorne ou redirecione
    if (!usuario) {
      setIsLoading(false);
      setError("Você precisa estar logado para ver suas prescrições.");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const prescricoes = await getPrescricoesPorUsuario(usuario.id);

        // se a API já retornar no formato das colunas, pode pular o map
        const lista: Consulta[] = Array.isArray(prescricoes)
          ? prescricoes.map(mapToConsulta)
          : [];

        setData(lista);
      } catch (err: any) {
        console.error("Erro ao buscar prescrições:", err);
        setError(
          err?.message || "Não foi possível carregar os dados. Tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [carregando, usuario]);

  if (carregando || isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>;
  }

  return <DataTable columns={columns} data={data} />;
}
