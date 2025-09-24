import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroUsuario from "./pages/auth/CadastroUsuario"
import MenuDashboard from "./pages/MenuDashboard"
import Home from "./pages/Home"
import { LoginUsuario } from "./pages/auth/LoginUsuario"
import { MotoqueiroCadastro } from "./pages/gestao-motoqueiro/MotoqueiroCadastro"
import { GalpaoCadastro } from "./pages/gestao-galpao/GalpaoCadastro"
import { PageNotFound } from "./pages/auth/PageNotFound"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/dashboard" element={<MenuDashboard />} />
        <Route path="/cadastrar-motoqueiro" element={<MotoqueiroCadastro />} />
        <Route path="/cadastrar-galpao" element={<GalpaoCadastro />} />
        {/* <Route path="/listar-galpoes" element={<GalpaoLista />} />
        <Route path="/listar-motoqueiros" element={<MotoqueiroLista />} /> */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
