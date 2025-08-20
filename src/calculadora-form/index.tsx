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

import { useUser } from "@/context/usuario-context";

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

  const { usuario } = useUser();

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
              if (!usuario) {
                console.warn(
                  "⚠️ Usuário não logado — redirecionando para /login"
                );
                navigate("/login");
                return;
              }

              // debug rápido: confira cookies disponíveis no browser
              // console.log("🍪 document.cookie:", document.cookie);

              console.log("➡️ POST /prescricao/calcular (dados):", dados);
              const resultado = await postCalculoPrescricao(dados);
              console.log("✅ Resultado calcular:", resultado);

              const usuarioId = usuario?.id;
              if (!usuarioId) {
                console.error("Sem usuário no contexto — bloqueando salvar.");
                // mostre UI de erro ou redirecione para login
                return;
              }

              const payloadParaSalvar: PrescricaoSaveDTO = {
                ...dados,
                usuarioId: usuarioId, // pegue do contexto!
              } as PrescricaoSaveDTO;

              console.log(" USUARIO ID>>>> ", usuarioId);

              console.log(
                "➡️ POST /prescricao/salvar (payload):",
                JSON.stringify(payloadParaSalvar, null, 2)
              );

              const salvo = await postSalvarPrescricao(payloadParaSalvar);
              console.log("✅ Salvo:", salvo);

              // guarde o resultado do cálculo para a tela de resultado
              setResultado(resultado);

              navigate("/result");
            } catch (error: any) {
              console.error(
                "❌ Erro ao calcular/salvar prescrição:",
                error?.response ?? error
              );
              // dica: se vier 401/403 aqui, quase sempre é sessão/CSRF
              // verifique se usou baseURL '/', withCredentials, ensureCsrfOnce
            }
          }}
        />
      )}
    </div>
  );
}
