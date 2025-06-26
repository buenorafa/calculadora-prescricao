"use client";

import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getPrescricoesPorUsuario } from "@/service/api";
// import type { CalculoPrescricao } from "@/types/calculo-prescricao";
import type { Consulta } from "./components/columns";
import { useEffect, useState } from "react";

// import { mockData } from "./mock";

export default function ListagemPage() {
  // Estado para armazenar as prescrições vindas da API
  const [data, setData] = useState<Consulta[]>([]);
  // Estado para controlar o status de carregamento
  const [isLoading, setIsLoading] = useState(true);
  // Estado para armazenar qualquer erro que ocorra na busca
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
      try {
        // --- IMPORTANTE ---
        // Você precisa de alguma forma obter o ID do usuário logado.
        // Aqui estou usando '1' como exemplo.
        // Substitua pelo ID do usuário real.
        const usuarioId = 1; 
        
        const prescricoes = await getPrescricoesPorUsuario(usuarioId);
        setData(prescricoes);
      } catch (err) {
        console.error("Erro ao buscar prescrições:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        // Garante que o estado de 'carregando' seja desativado
        // tanto em caso de sucesso quanto de erro.
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio `[]` faz com que o useEffect execute apenas uma vez, quando o componente é montado.

  // Renderização condicional baseada no estado
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return <DataTable columns={columns} data={data} />;
}
//   return <DataTable columns={columns} data={getPrescricoesPorUsuario()} />;
// }
