import { Link } from "react-router-dom";
import { useCalculoPrescricao } from "@/context/calculo-prescricao-context";

export function Result() {
  const { resultado } = useCalculoPrescricao();

  if (!resultado) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Nenhum resultado disponível. Retorne e refaça o cálculo.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute flex text-[#2B2823] gap-5 flex-col text-xl mb-20 font-semibold z-50 bg-white/80 p-8 rounded-md ">
        <p className="text-4xl font-bold fonteLogo">
          RESULTADO DO CÁLCULO DE PRESCRIÇÃO
        </p>
        <div className="flex flex-col gap-8">
          <label>Pena: {resultado.pena}</label>
          <label>Faixa etária: {resultado.faixaEtaria}</label>
          <label>Prazo prescrição: {resultado.prazoPrescricional}</label>
          <label>Data provável: {resultado.dataProvavel}</label>
        </div>
        <div className="flex flex-row gap-8 justify-end mt-10 font-light ">
          <Link
            to="/calculadora"
            className="h-10 flex self-end text-white w-2/6 bg-[#2B2823] items-center justify-center rounded-md hover:bg-[#685c49]"
          >
            Novo cálculo
          </Link>
          <Link
            to="#"
            className="h-10 flex self-end text-black w-2/6 bg-[#ADB6A7] items-center justify-center rounded-md hover:bg-[#9AA394]"
          >
            Salvar Resultado
          </Link>
        </div>
      </div>
      <img
        src="/Footer.png"
        alt="Foto escritório"
        className="object-cover scale-x-125 w-full opacity-100"
      />
    </div>
  );
}
