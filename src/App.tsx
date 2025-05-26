import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroUsuario from "./pages/CadastroUsuario"
import MotoCadastro from "./pages/MotoCadastro"
import MapaPatio from "./pages/MapaPatio"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastroUsuario />} />
        <Route path="/cadastrar_moto" element={<MotoCadastro />} />
        <Route path="/mapa_moto" element={<MapaPatio />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
