import { Outlet, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Detalle from '../pages/Detalle'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminInstruments from '../pages/admin/AdminInstruments'
import Carrito from '../pages/Carrito'
import { CarritoStepTwo } from '../pages/CarritoStepTwo'
import ApprovedPayment from '../pages/ApprovedPayment'
import RejectedPayment from '../pages/RejectedPayment'
import AuthGuard from '../components/AuthGuard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AuthVerify from '../components/AuthVerify'
import UserGuard from '../components/UserGuard'
import AdminCharts from '../pages/admin/AdminCharts'

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow size-full">
        <Routes>
          {/* Rutas públicas */}
          <Route element={<AuthVerify />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas protegidas con layout privado */}
          <Route
            element={
              
                <>
                  <UserGuard>
                    
                  <Header />
                  <Outlet />
                  </UserGuard>
                </>
            }
          >
            <Route path="/" element={<Landing />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route element={<AuthGuard></AuthGuard>}>
              <Route path="/admin/charts" element={<AdminCharts />} />
              <Route path="/admin/instrumentos" element={<AdminInstruments />} />
            </Route>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/carrito/step2" element={<CarritoStepTwo />} />
            <Route path="/pago-aprobado/:id" element={<ApprovedPayment />} />
            <Route path="/pago-rechazado" element={<RejectedPayment />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes
