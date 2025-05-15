import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Detalle from '../pages/Detalle'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminInstruments from '../pages/AdminInstruments'
import Carrito from '../pages/Carrito'
import { CarritoStepTwo } from '../pages/CarritoStepTwo'
import ApprovedPayment from '../pages/ApprovedPayment'

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow size-full">
        <Routes >
            <Route path="/" element={<Landing />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/admin/instrumentos" element={<AdminInstruments />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/carrito/step2" element={<CarritoStepTwo />} />
            <Route path="/pago/aprobado/:id" element={<ApprovedPayment />} />
            <Route path="/pago/rechazado/" element={<ApprovedPayment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes
