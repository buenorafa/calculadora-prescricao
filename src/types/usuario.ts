export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha?: string; // geralmente não mantemos a senha em memória
};
