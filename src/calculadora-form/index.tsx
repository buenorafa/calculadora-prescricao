import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import { DadosGeraisForm } from "./components/dados-gerais";
import { useCalculoPrescricao } from "../context/calculo-prescricao-context";
import { DadosOperadorForm } from "./components/dados-operador";
import { postCalculoPrescricao, postSalvarPrescricao } from "@/service/api";
import { DatasProcessoForm } from "./components/datas-processo";
import { CausasInterrupcaoForm } from "./components/causas-interrupcao";
import type { PrescricaoSaveDTO } from "@/types/prescricao";

export default function CalculoPrescricaoIndex() {
  const [step, setStep] = useState(0);
  const { dados, setResultado } = useCalculoPrescricao(); // ✅ Importar setResultado do contexto
  const navigate = useNavigate(); // ✅ Inicializar hook de navegação

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto">
      {step === 0 && (
        <DadosGeraisForm
          onNext={goToNextStep}
          tipoPrescricaoSelecionada={"ABSTRATA"}
        />
      )}

      {step === 1 && (
        <DatasProcessoForm onNext={goToNextStep} onBack={goToPreviousStep} />
      )}

      {step === 2 && (
        <CausasInterrupcaoForm
          onBack={goToPreviousStep}
          onNext={goToNextStep}
        />
      )}

      {step === 3 && (
        <DadosOperadorForm
          onBack={goToPreviousStep}
          onNext={async () => {
            try {
              const response = await postCalculoPrescricao(dados);
              const usuarioId = 1;
              const payloadParaSalvar = {
                ...dados,
                usuarioId: usuarioId,
              };
              // console.log("Enviando para salvar:", payloadParaSalvar);
              console.log(
                "🔴 PAYLOAD FINAL ENVIADO PARA /salvar:",
                JSON.stringify(payloadParaSalvar, null, 2)
              );
              await postSalvarPrescricao(
                payloadParaSalvar as PrescricaoSaveDTO
              );
              console.log("Prescrição salva com sucesso no banco de dados!");
              setResultado(response); // ✅ Armazena o resultado no contexto
              navigate("/result"); // ✅ Navega para a página de resultado
            } catch (error) {
              console.error("❌ Erro ao gerar payload:", error);
            }
          }}
        />
      )}
    </div>
  );
}
