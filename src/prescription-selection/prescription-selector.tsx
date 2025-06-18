import { Link } from "react-router-dom";

export function TypeSelector() {

    return (
        <div className="flex flex-col justify-center text-5xl w-5/7 font-semibold mx-auto">
            <div className="mt-20 flex flex-col justify-center">
               <p>Calculadora de Prescrição Punitiva</p>
                 <Link to ="#" className="mt-5 w-max px-6 py-2 container font-semibold text-sm text-white bg-black items-center justify-center rounded-sm hover:bg-black/80">
                               CRIE SUA CONTA
                           </Link>

            </div>
        <div className="flex text-black flex-row h-full text-center gap-10 font-semibold items-center text-4xl justify-between">
        <div className="bg-white relative rounded-md w-84 min-w-52 min-h-96 h-3/5 hover:brightness-90 shadow-lg items-center">  <Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "ABSTRATA" }} className="flex flex-col h-full w-full text-center items-center justify-center"><i className="absolute top-20 text-5xl fa-solid fa-scale-balanced"></i><p>Em abstrato</p><p className="absolute bottom-20 text-lg px-6 font-light">Calcule o prazo antes da sentença condenatória</p></Link></div>
        <div className=" bg-[#e6ede5] relative rounded-md w-84 min-w-52 min-h-96 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "CONCRETO" }} className="flex h-full w-full text-center items-center justify-center"><i className="absolute top-20 text-5xl fa-solid fa-lock"></i><p>Executória</p><p className="absolute bottom-20 text-lg px-6 font-light">Determine o prazo após a condenação definitiva</p></Link></div>
        <div className=" bg-[#f4e0d9] relative rounded-md w-84 min-w-52 min-h-96 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "RETROATIVA" }} className="flex h-full w-full text-center items-center justify-center"><i className="absolute top-20 text-5xl fa-solid fa-clock-rotate-left"></i><p>Retroativa</p><p className="absolute bottom-20 text-lg px-6 font-light">Considera a pena aplicada na sentença para calcular o prazo</p></Link></div>
        <div className=" bg-[#c7cad1] relative rounded-md w-84 min-w-52 min-h-96 h-3/5 hover:brightness-90 shadow-lg"><Link to = "/calculadora" state={{ tipoPrescricaoSelecionada: "INTERCORRENTE" }} className="flex h-full w-full text-center items-center justify-center"><i className="absolute top-20 text-5xl fa-regular fa-circle-pause"></i><p>Intercorrente</p><p className="absolute bottom-20 text-lg px-6 font-light">Calcule o prazo durante a execução da pena</p></Link></div>
        </div>
        </div>
    );

}