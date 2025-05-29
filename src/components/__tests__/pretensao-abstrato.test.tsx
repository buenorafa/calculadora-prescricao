import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PretensaoAbstratoForm } from "../../calculadora-form/components/pretensao-abstrato";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";
import { vi, type Mock } from "vitest";

// Mock do contexto
vi.mock("../../context/calculo-prescricao-context", () => ({
  useCalculoPrescricao: vi.fn(),
}));

const mockAtualizarDados = vi.fn();

beforeEach(() => {
  (useCalculoPrescricao as Mock).mockReturnValue({
    atualizarDados: mockAtualizarDados,
  });
});

describe("PretensaoAbstratoForm", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza todos os campos esperados", () => {
    render(<PretensaoAbstratoForm onNext={onNext} onBack={onBack} />);

    expect(screen.getByLabelText("Anos")).toBeInTheDocument();
    expect(screen.getByLabelText("Meses")).toBeInTheDocument();
    expect(screen.getByLabelText("Dias")).toBeInTheDocument();
    expect(screen.getByText("Causas especiais de aumento de pena")).toBeInTheDocument();
    expect(screen.getByText("Causas especiais de diminuição de pena")).toBeInTheDocument();
    expect(screen.getByText("O crime é tentado?")).toBeInTheDocument();
  });

  it("exibe mensagens de erro ao tentar submeter sem preencher os selects", async () => {
    render(<PretensaoAbstratoForm onNext={onNext} onBack={onBack} />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getAllByText("Selecione uma opção")).toHaveLength(3);
    });
  });

  it("submete o formulário com dados válidos e chama onNext e atualizarDados", async () => {
    render(<PretensaoAbstratoForm onNext={onNext} onBack={onBack} />);

    fireEvent.change(screen.getByLabelText("Anos"), { target: { value: 2 } });
    fireEvent.change(screen.getByLabelText("Meses"), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText("Dias"), { target: { value: 10 } });

    fireEvent.mouseDown(screen.getByLabelText("Causas especiais de aumento de pena"));
    fireEvent.click(screen.getAllByText("1/3")[0]);

    fireEvent.mouseDown(screen.getByLabelText("Causas especiais de diminuição de pena"));
    fireEvent.click(screen.getByText("1/4"));

    fireEvent.mouseDown(screen.getByLabelText("O crime é tentado?"));
    fireEvent.click(screen.getByText("Não"));

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockAtualizarDados).toHaveBeenCalledWith({
        penaAnos: 2,
        penaMeses: 3,
        penaDias: 10,
        aumento: "1/3",
        diminuicao: "1/4",
        tentativa: "nao",
      });

      expect(onNext).toHaveBeenCalled();
    });
  });

  it("chama onBack quando o botão de voltar é clicado", () => {
    render(<PretensaoAbstratoForm onNext={onNext} onBack={onBack} />);

    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(onBack).toHaveBeenCalled();
  });
});
