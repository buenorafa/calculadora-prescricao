import { Link } from "react-router-dom";

export function TypeSelector() {

    return (
        <div className="flex flex-col justify-center text-4xl w-5/7 font-semibold mx-auto">
            <div className="mt-20 flex flex-col justify-center">
               <p>Calculadora de Prescrição Punitiva</p>
                 <Link to ="#" className="mt-5 w-max px-6 py-1.5 container font-semibold text-lg text-white bg-black items-center justify-center rounded-sm hover:bg-black/80">
                               CRIE SUA CONTA
                           </Link>

            </div>
        <div className="flex text-black flex-row h-full text-center gap-10 font-semibold items-center text-4xl justify-between">
        <div className="bg-white rounded-md w-84 h-3/5 hover:brightness-90 shadow-lg">  <Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "ABSTRATA" }} className="flex h-full flex-col w-full text-center items-center justify-center"><i className="fa-solid fa-scale-balanced"></i>Em abstrato</Link></div>
        <div className=" bg-[#e6ede5] rounded-md w-84 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "CONCRETO" }} className="flex h-full w-full text-center items-center justify-center">Executória</Link></div>
        <div className=" bg-[#f4e0d9] rounded-md w-84 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "RETROATIVA" }} className="flex h-full w-full text-center items-center justify-center">Retroativa</Link></div>
        <div className=" bg-[#8a8e99] rounded-md w-84 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "INTERCORRENTE" }} className="flex h-full w-full text-center items-center justify-center">Intercorrente</Link></div>
        </div>
        </div>
    );

}