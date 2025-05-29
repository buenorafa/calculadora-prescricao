export type AumentoDePena =
  | "nao"
  | "1/6"
  | "1/5"
  | "1/4"
  | "1/3"
  | "1/2"
  | "2/3"
  | "2x";

export type DiminuicaoDePena =
  | "nao"
  | "1/6"
  | "1/5"
  | "1/4"
  | "1/3"
  | "1/2"
  | "2/3";

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
  // Dados Gerais
  nomeAcusado: string;
  numeroProcesso: string;
  dataNascimento: string;
  tipoPrescricao: "em-abstrato" | "em-concreto";
  // Pretensão Abstrata e Concreta
  penaAnos: number;
  penaMeses: number;
  penaDias: number;
  // Pretensão Abstrata
  aumento: AumentoDePena;
  diminuicao: DiminuicaoDePena;
  tentativa: "sim" | "nao";
  // Datas e Suspensões
  dataFato: string;
  dataRecebimento: string;
  suspensoes: Suspensao[];
  tribunalJuri: "sim" | "nao";
  dataSentenca?: string;
  dataAcordaoPronuncia?: string;
  dataSentencaCondenatoria: string;
  dataAcordaoCondenatorio: string;
  outrasDatas: OutraData[];
  // dados operador
  observacao: string;
  dataCalculo: string;
  elaboradoPor: string;
}
