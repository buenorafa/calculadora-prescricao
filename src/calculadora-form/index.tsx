import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCalculoPrescricao } from "../context/calculo-prescricao-context";

import { postCalculoPrescricao, postSalvarPrescricao } from "@/service/api";

import {
  DadosGeraisForm,
  FormAbstrata,
  FormExecutoria,
  FormRetroativa,
  FormIntercorrente,
  DadosOperadorForm,
} from "./components/";
import type { PrescricaoSaveDTO } from "@/types/prescricao";

export default function CalculoPrescricaoIndex() {
  const [step, setStep] = useState(0);
  const { dados, setResultado } = useCalculoPrescricao();
  const navigate = useNavigate();

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  const formComponentMap = {
    ABSTRATA: (
      <FormAbstrata
        onBack={goToPreviousStep}
        onNext={goToNextStep}
        dataFato={dados.dataFato}
      />
    ),
    CONCRETO: (
      <FormExecutoria onBack={goToPreviousStep} onNext={goToNextStep} />
    ),
    RETROATIVA: (
      <FormRetroativa onBack={goToPreviousStep} onNext={goToNextStep} />
    ),
    INTERCORRENTE: (
      <FormIntercorrente onBack={goToPreviousStep} onNext={goToNextStep} />
    ),
  } as const;

  // Normaliza a chave e valida
  const tipo = dados.tipoPrescricao?.toUpperCase();
  const isTipoValido = tipo && tipo in formComponentMap;

  return (
    <div className="max-w-3xl mx-auto">
      {step === 0 && <DadosGeraisForm onNext={goToNextStep} />}

      {step === 1 &&
        isTipoValido &&
        formComponentMap[tipo as keyof typeof formComponentMap]}

      {step === 2 && (
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
              setResultado(response);
              navigate("/result");
            } catch (error) {
              console.error("❌ Erro ao gerar payload:", error);
            }
          }}
          // onNext={() => {
          //   console.log("Enviando: ", dados);
          // }}
        />
      )}
    </div>
  );
}
