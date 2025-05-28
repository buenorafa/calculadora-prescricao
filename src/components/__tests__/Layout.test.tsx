// Layout.test.tsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Layout } from "../../layout-base/layout";

describe("<Layout />", () => {
  it("deve renderizar o logo", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const logo = screen.getByAltText("Logo Calculadora de prescrição");
    expect(logo).toBeInTheDocument();
  });

  it("deve conter link para /calculadora", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const calcLink = screen.getByRole("link", { name: /Calcular Prescrição/i });
    expect(calcLink).toHaveAttribute("href", "/calculadora");
  });

  it("deve renderizar botão de criar conta", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const button = screen.getByRole("link", { name: /Criar conta/i });
    expect(button).toBeInTheDocument();
  });

  it("deve renderizar conteúdo do <Outlet />", () => {
    // Simulamos o conteúdo do Outlet usando um mock
    render(
      <MemoryRouter>
        <Layout />
        <div>Conteúdo do Outlet</div>
      </MemoryRouter>
    );
    expect(screen.getByText("Conteúdo do Outlet")).toBeInTheDocument();
  });
});
