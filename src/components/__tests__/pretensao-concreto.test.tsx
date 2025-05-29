import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PretensaoConcretoForm } from "../../calculadora-form/components/pretensao-concreto";
import { useCalculoPrescricao } from "../../context/calculo-prescricao-context";

// Mock do contexto
jest.mock("../../../context/calculo-prescricao-context", () => ({
  useCalculoPrescricao: jest.fn(),
}));

describe("PretensaoConcretoForm", () => {
  const onNext = jest.fn();
  const onBack = jest.fn();
  const atualizarDados = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCalculoPrescricao as jest.Mock).mockReturnValue({ atualizarDados });
  });

  it("renderiza os campos corretamente", () => {
    render(<PretensaoConcretoForm onNext={onNext} onBack={onBack} />);

    expect(screen.getByLabelText("Anos")).toBeInTheDocument();
    expect(screen.getByLabelText("Meses")).toBeInTheDocument();
    expect(screen.getByLabelText("Dias")).toBeInTheDocument();
  });

  it("submete o formulário com dados válidos", async () => {
    render(<PretensaoConcretoForm onNext={onNext} onBack={onBack} />);
    const user = userEvent.setup();

    await user.clear(screen.getByLabelText("Anos"));
    await user.type(screen.getByLabelText("Anos"), "2");

    await user.clear(screen.getByLabelText("Meses"));
    await user.type(screen.getByLabelText("Meses"), "3");

    await user.clear(screen.getByLabelText("Dias"));
    await user.type(screen.getByLabelText("Dias"), "10");

    await user.click(screen.getByRole("button", { name: /continuar/i }));

    expect(atualizarDados).toHaveBeenCalledWith({
      penaAnos: 2,
      penaMeses: 3,
      penaDias: 10,
    });

    expect(onNext).toHaveBeenCalled();
  });

  it("exibe mensagens de erro se os campos forem inválidos", async () => {
    render(<PretensaoConcretoForm onNext={onNext} onBack={onBack} />);
    const user = userEvent.setup();

    // limpar valores
    await user.clear(screen.getByLabelText("Anos"));
    await user.clear(screen.getByLabelText("Meses"));
    await user.clear(screen.getByLabelText("Dias"));

    await user.click(screen.getByRole("button", { name: /continuar/i }));

    expect(await screen.findAllByText("Campo obrigatório")).toHaveLength(3);
    expect(atualizarDados).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });
});
