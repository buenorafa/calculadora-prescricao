import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./layout-base/layout";
import CalculadoraForm from "./calculadora-form";

import { CalculoPrescricaoProvider } from "./context/calculo-prescricao-context";
import { Result } from "./result-view/result";
import { TypeSelector } from "./prescription-selection/prescription-selector";
import ListagemPage from "./listagem";

import CadastroPage from "./cadastro-form/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TypeSelector />} />

          {/* Envolve as rotas de calculadora e resultado com o Provider */}
          <Route
            element={
              <CalculoPrescricaoProvider>
                {/* Outlet será usado automaticamente nas rotas filhas */}
                <Outlet />
              </CalculoPrescricaoProvider>
            }
          >
            <Route path="calculadora" element={<CalculadoraForm />} />
            <Route path="result" element={<Result />} />
            <Route path="type-selector" element={<TypeSelector />} />
          </Route>

          <Route path="cadastro" element={<CadastroPage />}></Route>

          {/* Adicione outras rotas aqui */}
          <Route path="listagem" element={<ListagemPage></ListagemPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
