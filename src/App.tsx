import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroUsuario from "./pages/auth/CadastroUsuario"
import MenuDashboard from "./pages/MenuDashboard"
import Home from "./pages/Home"
import { LoginUsuario } from "./pages/auth/LoginUsuario"
import { MotoqueiroCadastro } from "./pages/gestao-motoqueiro/CadastroMotoqueiro"
import { GalpaoCadastro } from "./pages/gestao-galpao/CadastrarGalpao"
import { PageNotFound } from "./pages/auth/PageNotFound"
import { ListaGalpao } from "./pages/gestao-galpao/ListaGalpao"
import { ListaMotoqueiro } from "./pages/gestao-motoqueiro/ListaMotoqueiro"
import { EditarGalpao } from "./pages/gestao-galpao/EditarGalpao"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/dashboard" element={<MenuDashboard />} />
        <Route path="/cadastrar-galpao" element={<GalpaoCadastro />} />
        <Route path="/listar-galpoes" element={<ListaGalpao />} />
        <Route path="/editar-galpao" element={<EditarGalpao  />} />
        <Route path="/cadastrar-motoqueiro" element={<MotoqueiroCadastro />} />
        <Route path="/listar-motoqueiros" element={<ListaMotoqueiro />} /> 
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
