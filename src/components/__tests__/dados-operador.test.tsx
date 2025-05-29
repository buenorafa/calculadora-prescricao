import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { DadosOperadorForm } from "../../calculadora-form/components/dados-operador";
import { CalculoPrescricaoProvider } from "@/context/calculo-prescricao-context";

// Mock do contexto
vi.mock("@/context/calculo-prescricao-context", async () => {
  const actual = await vi.importActual<any>("@/context/calculo-prescricao-context");
  return {
    ...actual,
    useCalculoPrescricao: () => ({
      atualizarDados: vi.fn(),
    }),
  };
});

function renderWithContext(onNext = vi.fn()) {
  return render(
    <CalculoPrescricaoProvider>
      <DadosOperadorForm onNext={onNext} onBack={() => {}} />
    </CalculoPrescricaoProvider>
  );
}

describe("DadosOperadorForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar todos os campos corretamente", () => {
    renderWithContext();

    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do cálculo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/elaborado por/i)).toBeInTheDocument();
  });

  it("deve exibir mensagens de erro ao tentar enviar com campos vazios", async () => {
    const user = userEvent.setup();
    renderWithContext();

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(await screen.findAllByText(/obrigatória/)).toHaveLength(3);
  });

  it("deve chamar onNext e atualizarDados com valores válidos", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();

    renderWithContext(onNext);

    await user.type(screen.getByLabelText(/observação/i), "Sem observações relevantes");
    await user.type(screen.getByLabelText(/elaborado por/i), "Maria Oliveira");
    await user.type(screen.getByLabelText(/data do cálculo/i), "2024-10-15");

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(onNext).toHaveBeenCalled();
  });
});
