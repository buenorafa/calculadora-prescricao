import { Link } from "react-router-dom";
import { useCalculoPrescricao } from "@/context/calculo-prescricao-context";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export function Result() {
  const { resultado } = useCalculoPrescricao();
  const resultRef = useRef(null);

  // Função para exportar o resultado para PDF
  const handleExportPdf = () => {
    if (resultRef.current) {
      // Captura o conteúdo da div como uma imagem
      html2canvas(resultRef.current, {
        scale: 2, // Aumenta a escala para melhorar a qualidade do PDF
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Converte o canvas para URL de imagem
        const pdf = new jsPDF("p", "mm", "a4"); // Cria um novo documento PDF no formato A4

        // Calcula a altura da imagem no PDF
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a imagem ao PDF
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Se o conteúdo for maior que uma página, adiciona novas páginas
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Salva o arquivo com um nome
        pdf.save("resultado-prescricao.pdf");
      });
    }
  };

  if (!resultado) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Nenhum resultado disponível. Retorne e refaça o cálculo.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden relative">
      <div
        ref={resultRef}
        className="absolute flex text-[#2B2823] gap-5 flex-col text-xl mb-20 font-semibold z-50 bg-white/80 p-8 rounded-md "
      >
        <p className="text-4xl font-bold fonteLogo">
          RESULTADO DO CÁLCULO DE PRESCRIÇÃO
        </p>
        <div className="flex flex-col gap-8">
          <label>Pena: {resultado.pena}</label>
          <label>Faixa etária: {resultado.faixaEtaria}</label>
          <label>Prazo prescrição: {resultado.prazoPrescricional}</label>
          <label>Data provável: {resultado.dataProvavel}</label>
        </div>
        <div className="flex flex-row gap-8 justify-between mt-10 font-light ">
          <button
            onClick={handleExportPdf}
            className="h-10 flex self-end text-black w-2/6 bg-[#ffffff] border-black border-1 hover:bg-white/40 items-center justify-center rounded-md"
          >
            Exportar PDF <i className="fa-solid fa-file-pdf pl-2"></i>
          </button>
          <Link
            to="/calculadora"
            className="h-10 flex self-end text-white w-2/6 bg-[#2B2823] items-center justify-center rounded-md hover:bg-[#685c49]"
          >
            Novo cálculo
          </Link>
          {/* <Link
            to="#"
            className="h-10 flex self-end text-black w-2/6 bg-[#ADB6A7] items-center justify-center rounded-md hover:bg-[#9AA394]"
          >
            Salvar Resultado
          </Link> */}
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
