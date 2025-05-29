import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  titulo?: string;
}

export function FormWrapper({
  children,
  onSubmit,
  onBack,
  isLastStep = false,
  titulo,
}: FormWrapperProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {titulo && <h2 className="text-xl font-semibold">{titulo}</h2>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        {children}

        <div className="flex justify-between pt-4">
          {onBack ? (
            <Button type="button" variant="outline" onClick={onBack}>
              Voltar
            </Button>
          ) : (
            <div />
          )}
          <Button type="submit">{isLastStep ? "Enviar" : "Próximo"}</Button>
        </div>
      </form>
    </div>
  );
}
