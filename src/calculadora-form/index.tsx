import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import { DadosGeraisForm } from "./components/dados-gerais";
import { useCalculoPrescricao } from "../context/calculo-prescricao-context";
import { DadosOperadorForm } from "./components/dados-operador";
import { postCalculoPrescricao } from "@/service/api";
import { DatasProcessoForm } from "./components/datas-processo";
import { CausasInterrupcaoForm } from "./components/causas-interrupcao";

export default function CalculoPrescricaoIndex() {
  const [step, setStep] = useState(0);
  const { dados, setResultado } = useCalculoPrescricao(); // ✅ Importar setResultado do contexto
  const navigate = useNavigate(); // ✅ Inicializar hook de navegação

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto">
      {step === 0 && <DadosGeraisForm onNext={goToNextStep} tipoPrescricaoSelecionada={"ABSTRATA"} />}

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
