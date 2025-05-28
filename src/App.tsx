import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout-base/layout";
import CalculadoraForm from "./calculadora-form";
import {Home} from "./home-page/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/calculadora" element={<CalculadoraForm />} />
          {/* Adicione outras rotas aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
