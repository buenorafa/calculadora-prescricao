import React, { forwardRef } from 'react';


export const Pdfresult = forwardRef<HTMLDivElement, { resultado: any }>(({ resultado }, ref) => {
  return (
    <div ref={ref} className="p-8">
      <h1 className="text-2xl font-bold">Resultado do Cálculo de Prescrição</h1>
      <p>Pena: {resultado.pena}</p>
      <p>Faixa etária: {resultado.faixaEtaria}</p>
      <p>Prazo prescrição: {resultado.prazoPrescricional}</p>
      <p>Data provável: {resultado.dataProvavel}</p>
    </div>
  );
});