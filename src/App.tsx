import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./layout-base/layout";
import CalculadoraForm from "./calculadora-form";

import { CalculoPrescricaoProvider } from "./context/calculo-prescricao-context";
import { Result } from "./result-view/result";
import { TypeSelector } from "./prescription-selection/prescription-selector";
import ListagemPage from "./listagem";

import CadastroPage from "./cadastro-form/index";
import LoginPage from "./login-form";
import UsuarioPage from "./usuario";
import { UserProvider } from "./context/usuario-context";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
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
            <Route path="login" element={<LoginPage />}></Route>
            {/* Adicione outras rotas aqui */}

            <Route path="usuario" element={<UsuarioPage />}></Route>

            <Route path="listagem" element={<ListagemPage></ListagemPage>} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
