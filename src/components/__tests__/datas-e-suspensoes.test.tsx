import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DatasESuspensoesForm } from "../../calculadora-form/components/datas-e-suspensoes";
import { CalculoPrescricaoProvider } from "../../context/calculo-prescricao-context";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

describe("DatasESuspensoesForm", () => {
  const mockOnNext = vi.fn();
  const mockOnBack = vi.fn();

  function renderWithContext() {
    return render(
      <CalculoPrescricaoProvider>
        <DatasESuspensoesForm onNext={mockOnNext} onBack={mockOnBack} />
      </CalculoPrescricaoProvider>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exibe mensagens de erro ao submeter sem preencher campos obrigatórios", async () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));

    await waitFor(() => {
      expect(screen.getByText("Informe a data do fato")).toBeInTheDocument();
      expect(
        screen.getByText("Informe a data do recebimento")
      ).toBeInTheDocument();
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument(); // tribunalJuri
      expect(
        screen.getByText("Campo obrigatório", { exact: false })
      ).toBeInTheDocument(); // dataSentencaCondenatoria e dataAcordaoCondenatorio
    });

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it("permite adicionar e remover suspensões", async () => {
    renderWithContext();

    const adicionarBtns = screen.getAllByRole("button", { name: /adicionar/i });
    const adicionarSuspensaoBtn = adicionarBtns[0]; // botão "Adicionar" do bloco Suspensões
    fireEvent.click(adicionarSuspensaoBtn);
    const tipoInput = await screen.findByLabelText("Tipo");
    fireEvent.change(tipoInput, { target: { value: "Férias" } });

    const removerBtn = screen.getByRole("button", { name: /remover/i });
    fireEvent.click(removerBtn);

    await waitFor(() => {
      expect(screen.queryByLabelText("Tipo")).not.toBeInTheDocument();
    });
  });

  it("renderiza campos condicionais se tribunal do júri for 'Sim'", async () => {
    renderWithContext();

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Sim"));

    await waitFor(() => {
      expect(
        screen.getByLabelText("Data de Publicação da Sentença de Pronúncia")
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Data do Acórdão Confirmatório da Pronúncia")
      ).toBeInTheDocument();
    });
  });

  it("permite adicionar e remover outras datas", async () => {
    renderWithContext();

    fireEvent.click(screen.getAllByRole("button", { name: /adicionar/i })[1]);

    const descricaoInput = await screen.findByLabelText("Descrição");
    fireEvent.change(descricaoInput, { target: { value: "Audiência" } });

    const removerBtn = screen.getByRole("button", { name: /remover/i });
    fireEvent.click(removerBtn);

    await waitFor(() => {
      expect(screen.queryByLabelText("Descrição")).not.toBeInTheDocument();
    });
  });

  it("chama onNext com dados válidos ao submeter", async () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Data do Fato/), {
      target: { value: "2023-01-01" },
    });

    fireEvent.change(screen.getByLabelText(/Recebimento/), {
      target: { value: "2023-01-02" },
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Não"));

    fireEvent.change(screen.getByLabelText(/Sentença Penal Condenatória/), {
      target: { value: "2023-01-03" },
    });

    fireEvent.change(screen.getByLabelText(/Acórdão Condenatório/), {
      target: { value: "2023-01-04" },
    });

    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });
});
