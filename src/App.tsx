import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroUsuario from "./pages/auth/CadastroUsuario"
import MenuDashboard from "./pages/MenuDashboard"
import Home from "./pages/Home"
import { LoginUsuario } from "./pages/auth/LoginUsuario"
import { MotoqueiroCadastro } from "./pages/MotoqueiroCadastro"
import { GalpaoCadastro } from "./pages/GalpaoCadastro"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route path="/dashboard" element={<MenuDashboard />} />
        <Route path="/motoqueiro-cadastro" element={<MotoqueiroCadastro />} />
        <Route path="/galpao-cadastro" element={<GalpaoCadastro />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
