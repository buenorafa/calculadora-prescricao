import React from "react";
import {Outlet} from "react-router-dom";
import { Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="layout-base h-screen">
      <main className="layout-content flex flex-col h-full">
        <nav className="flex w-full flex-row h-24 p-4 justify-between bg-white">
          <div className="flex justify-between items-center">
              <Link to="/"><img src="/CP.svg" alt="Logo Calculadora de prescrição" /></Link>
          </div>
          <div className="w-1/6 h-2/3 flex flex-row text-center self-center text-lg justify-between"> 
            <Link to ="#"
              className="flex font-semibold p-2 text-[#2B2823] solid bg-white justify-center items-center rounded-md hover:bg-[#2B2823] hover:text-white"
            >
              Consultar Histórico
            </Link>
             <Link to ="#" className="flex p-2 font-semibold text-white bg-[#2B2823] items-center justify-center rounded-md hover:bg-[#685c49]">
                Criar conta
            </Link>
          </div>
          
        </nav>
        <div className="flex h-full w-full">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
