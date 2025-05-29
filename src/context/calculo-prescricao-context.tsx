import { createContext, useContext, useState, type ReactNode } from "react";
import type { CalculoPrescricao } from "@/types/calculo-prescricao";

interface CalculoPrescricaoContextType {
  dados: Partial<CalculoPrescricao>;
  atualizarDados: (novosDados: Partial<CalculoPrescricao>) => void;
  limparDados: () => void;
}

const CalculoPrescricaoContext = createContext<
  CalculoPrescricaoContextType | undefined
>(undefined);

export function CalculoPrescricaoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dados, setDados] = useState<Partial<CalculoPrescricao>>({});

  const atualizarDados = (novosDados: Partial<CalculoPrescricao>) => {
    setDados((prev) => ({ ...prev, ...novosDados }));
  };

  const limparDados = () => {
    setDados({});
  };

  return (
    <CalculoPrescricaoContext.Provider
      value={{ dados, atualizarDados, limparDados }}
    >
      {children}
    </CalculoPrescricaoContext.Provider>
  );
}

export function useCalculoPrescricao() {
  const context = useContext(CalculoPrescricaoContext);
  if (!context) {
    throw new Error(
      "useCalculoPrescricao deve ser usado dentro de um CalculoPrescricaoProvider"
    );
  }
  return context;
}
