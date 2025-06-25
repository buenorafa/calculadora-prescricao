/**
 * Representa uma suspensão do processo com data de início e fim.
 * Adapte se a sua estrutura for diferente.
 */
export type SuspensaoDTO = {
  dataInicio: string; // Formato "YYYY-MM-DD"
  dataFim: string; // Formato "YYYY-MM-DD"
};

/**
 * DTO com os dados básicos para o CÁLCULO da prescrição.
 * Corresponde à classe `PrescricaoRequestDTO` do backend.
 */
export type PrescricaoRequestDTO = {
  nomeAcusado?: string;
  numeroProcesso?: string;
  dataNascimento?: string; // Formato "YYYY-MM-DD"
  tipoPrescricao?: string; // Ex?: "ABSTRATA", "EXECUTORIA", etc.
  penaAnos?: number;
  penaMeses?: number;
  penaDias?: number;
  dataFato?: string; // Formato "YYYY-MM-DD"
  dataTransitoEmJulgado?: string | null;
  dataRecebimentoDaDenuncia?: string | null;
  dataPronuncia?: string | null;
  dataConfirmatoriaDaPronuncia?: string | null;
  dataPublicacaoDaSentencaOuAcordao?: string | null;
  dataInicioDoCumprimentoDaPena?: string | null;
  dataContinuacaoDoCumprimentoDaPena?: string | null;
  dataReincidencia?: string | null;
  crimeTentado?: boolean;
  causasAumento?: boolean;
  causasReducao?: boolean;
  processoSuspenso?: boolean;
  tribunalJuri?: boolean;
  observacao?: string | null;
  elaboradoPor?: string;
  suspensoes?: SuspensaoDTO[];
};

/**
 * DTO utilizado para SALVAR a prescrição no banco de dados.
 * Herda todos os campos de `PrescricaoRequestDTO` e adiciona o `usuarioId`.
 * Corresponde à classe `PrescricaoSaveDTO` do backend.
 */
export type PrescricaoSaveDTO = PrescricaoRequestDTO & {
  /**
   * O ID do usuário logado que está salvando a prescrição.
   * É obrigatório para o salvamento.
   */
  usuarioId: number;
};

// (Opcional) Você também pode criar os tipos para as respostas da API
export type Prescricao = {
  id: number;
  // ... outros campos que a prescrição salva retorna
};

export type PrescricaoResponseDTO = {
  // ... campos que o endpoint de cálculo retorna
};
