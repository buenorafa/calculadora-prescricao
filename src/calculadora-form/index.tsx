import { Form } from "@/components/ui/form";
import { DadosGeraisForm } from "./components/dados-gerais";

function CalculadoraForm() {
  return (
    <div className="w-1/2 mx-auto self-center">
      <DadosGeraisForm></DadosGeraisForm>
    </div>
  );
}

export default CalculadoraForm;
