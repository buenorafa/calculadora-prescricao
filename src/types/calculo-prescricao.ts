export type TipoSuspensao =
  | "Acusado beneficiado com a suspensão condicional do processo, nos termos do artigo 89, § 6°, da Lei n° 9.099/95."
  | "Acusado citado por edital que não comparece e não constitui advogado (vide artigo 366 do CPP e Súmula 415 do STJ)."
  | "Existência de questão prejudicial, nos termos do artigo 92 e seguintes do Código de Processo Penal."
  | "Cumprimento de pena pelo acusado em país estrangeiro, salvo em caso de fato atípico (vide artigo 386, III, do CPP)."
  | "Sustação de processo criminal contra parlamentar, nos termos do artigo 53, § 3° a 5° da CF."
  | "Citação mediante carta rogatória de acusado em país estrangeiro, em lugar sabido, nos termos do artigo 368 do CPP.";

export interface Suspensao {
  tipo: TipoSuspensao;
  inicio: string; // formato ISO ou 'yyyy-mm-dd'
  fim: string;
}

export interface OutraData {
  descricao: string;
  data: string; // formato ISO ou 'yyyy-mm-dd'
}

export interface CalculoPrescricao {
  // Dados gerais
  nomeAcusado: string;
  numeroProcesso: string;
  dataNascimento: string;
  tipoPrescricao: "ABSTRATA" | "CONCRETO" | "RETROATIVA" | "INTERCORRENTE";
  penaAnos: number;
  penaMeses: number;
  penaDias: number;

  // Datas do processo
  dataFato: string;
  dataTransitoEmJulgado: string;
  dataRecebimentoDaDenuncia: string;
  dataPronuncia: string;
  dataConfirmatoriaDaPronuncia: string;
  dataPublicacaoDaSentencaOuAcordao: string;
  dataInicioDoCumprimentoDaPena: string;
  dataContinuacaoDoCumprimentoDaPena: string;
  dataReicidencia: string;

  // Flags e enums
  crimeTentado: "true" | "false";
  causasAumento: "true" | "false";
  causasReducao: "true" | "false";
  processoSuspenso: "true" | "false";

  tribunalJuri: "true" | "false";

  // Suspensões e datas adicionais
  suspensoes: Suspensao[];

  // Metadados
  observacao: string;
  elaboradoPor: string;
}
