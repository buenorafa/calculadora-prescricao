import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./layout-base/layout";
import CalculadoraForm from "./calculadora-form";
import { Home } from "./home-page/home";
import { CalculoPrescricaoProvider } from "./context/calculo-prescricao-context";
import { Result } from "./result-view/result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

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
          </Route>

          {/* Adicione outras rotas aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
