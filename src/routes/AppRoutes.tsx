import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Detalle from '../pages/Detalle'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminInstruments from '../pages/AdminInstruments'
import Carrito from '../pages/Carrito'

const AppRoutes = () => {
  return (
    <>
      <Header />
        <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/admin/instrumentos" element={<AdminInstruments />} />
            <Route path="/carrito" element={<Carrito />} />
        </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes
