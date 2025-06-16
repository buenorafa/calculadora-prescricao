import React from "react";
import {Outlet} from "react-router-dom";
import { Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="layout-base h-screen">
      <main className="layout-content flex flex-col w-full h-full">
        <nav className="flex flex-row h-24 justify-between items-center py-4 m-auto w-5/7 bg-white">
        
              <Link to="/" className="text-start"><img src="/CP.svg" alt="Logo Calculadora de prescrição" /></Link>

          <div className="w-2/6 h-2/3 flex flex-row text-center self-center text-lg justify-end gap-10"> 
            <Link to ="#"
              className="flex font-semibold p-2 text-black border-black border-1 solid bg-white justify-center items-center rounded-sm hover:bg-gray-100"
            >
              Consultar Histórico
            </Link>
             <Link to ="#" className="flex p-2 font-semibold text-white bg-black items-center justify-center rounded-sm hover:bg-black/80">
                Criar conta
            </Link>
          </div>
          
        </nav>
               <div className="w-full border-b-1">

        </div>
        <div className="flex h-full w-full">
            <Outlet />
        </div>
 
      </main>
    </div>
  );
}
