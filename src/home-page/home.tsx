import React from "react";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Calculadora de Prescrição</h1>
        <p className="text-lg text-gray-700 mb-8">Use o menu para começar a calcular sua prescrição.</p>
        <img src="/CP.svg" alt="Logo Calculadora de Prescrição" className="w-32 h-32 mb-4" />
        <a href="/calculadora" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Começar
        </a>
        </div>
    );


}