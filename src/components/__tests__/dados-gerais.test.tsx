import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DadosGeraisForm } from "../../calculadora-form/components/dados-gerais";
import { describe, it, vi, expect, beforeEach } from "vitest";
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
      <DadosGeraisForm onNext={onNext} />
    </CalculoPrescricaoProvider>
  );
}

describe("DadosGeraisForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os campos do formulário", () => {
    renderWithContext();

    expect(screen.getByLabelText(/nome do acusado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número do processo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByText(/espécie de prescrição/i)).toBeInTheDocument();
  });

  it("deve exibir mensagens de erro se o formulário for enviado vazio", async () => {
    const user = userEvent.setup();
    renderWithContext();

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(await screen.findAllByText(/obrigatório/)).toHaveLength(3);
    expect(screen.getByText(/selecione a espécie de prescrição/i)).not.toBeInTheDocument(); // valor padrão
  });

  it("deve chamar onNext e atualizarDados se o formulário for preenchido corretamente", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();

    renderWithContext(onNext);

    await user.type(screen.getByLabelText(/nome do acusado/i), "João da Silva");
    await user.type(screen.getByLabelText(/número do processo/i), "1234567-89.2023.8.00.0000");
    await user.type(screen.getByLabelText(/data de nascimento/i), "2000-01-01");
    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(onNext).toHaveBeenCalled();
  });
});
