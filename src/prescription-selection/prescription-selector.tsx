import { Link } from "react-router-dom";

export function TypeSelector() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute grid text-[#2B2823] grid-cols-2 h-full w-2/3 gap-30 font-semibold text-7xl z-50 content-center fonteLogo text-center">
        <div className=" bg-white/85 rounded-md w-full h-50 hover:bg-white">  <Link to = "/calculadora" className="flex h-full text-center items-center justify-center">Em abstrato</Link></div>
        <div className=" bg-white/85 rounded-md w-full h-50 hover:bg-white"><Link to = "/calculadora" className="flex h-full text-center items-center justify-center">Em concreto</Link></div>
        <div className=" bg-white/85 rounded-md w-full h-50 hover:bg-white"><Link to = "/calculadora" className="flex h-full text-center items-center justify-center">Retroativa</Link></div>
        <div className=" bg-white/85 rounded-md w-full h-50 hover:bg-white"><Link to = "/calculadora" className="flex h-full text-center items-center justify-center">Intercorrente</Link></div>
        </div>
        <img src="/Footer.png" alt="Foto escritório" className="object-cover scale-x-125 w-full opacity-100" />
        </div>
    );

}