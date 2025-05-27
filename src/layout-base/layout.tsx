import React from "react";
import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <div className="layout-base h-screen">
      <main className="layout-content flex h-full">
        <aside className="flex h-full flex-col w-1/4 p-4 gap-62 bg-[#ADB6A7]">
          <div className="flex justify-between items-center">
            <span>
              <img src="/CP.svg" alt="Logo Calculadora de prescrição" />
            </span>
            <a href="" className="h-10 flex font-semibold text-white w-2/6 bg-[#2B2823] items-center justify-center rounded-md hover:bg-[#685c49]">
                Criar conta
            </a>
          </div>
          <div className="h-2/5 w-4/6 flex flex-col text-center self-center text-2xl gap-24">
            <a
              href="#"
              className="h-full font-semibold flex text-[#2B2823] bg-[#9AA394] justify-center items-center rounded-md hover:bg-[#2B2823] hover:text-white"
            >
              Calcular Prescrição
            </a>
            <a
              href="#"
              className="h-full flex font-semibold text-[#2B2823] bg-[#9AA394] justify-center items-center rounded-md hover:bg-[#2B2823] hover:text-white"
            >
              Consultar Histórico
            </a>
          </div>
        </aside>
        <div className="m-auto">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
