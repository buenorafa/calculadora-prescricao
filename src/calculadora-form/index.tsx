import { useState } from "react";
import { DadosGeraisForm } from "./components/dados-gerais";
import { PretensaoAbstratoForm } from "./components/pretensao-abstrato";
import { PretensaoConcretoForm } from "./components/pretensao-concreto";
import { DatasESuspensoesForm } from "./components/datas-e-suspensoes";
import { useCalculoPrescricao } from "../context/calculo-prescricao-context";
import { DadosOperadorForm } from "./components/dados-operador";

export default function CalculoPrescricaoIndex() {
  const [step, setStep] = useState(0);
  const { dados } = useCalculoPrescricao();

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto">
      {step === 0 && <DadosGeraisForm onNext={goToNextStep} />}

      {step === 1 && dados.tipoPrescricao === "em-abstrato" && (
        <PretensaoAbstratoForm
          onNext={goToNextStep}
          onBack={goToPreviousStep}
        />
      )}

      {step === 1 && dados.tipoPrescricao === "em-concreto" && (
        <PretensaoConcretoForm
          onNext={goToNextStep}
          onBack={goToPreviousStep}
        />
      )}

      {step === 2 && (
        <DatasESuspensoesForm onBack={goToPreviousStep} onNext={goToNextStep} />
      )}

      {step === 3 && (
        <DadosOperadorForm
          onBack={goToPreviousStep}
          onNext={() => {
            // Aqui você pode substituir pelo envio final
            console.log(dados);
          }}
        />
      )}
    </div>
  );
}
