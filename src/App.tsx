import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ModalProvider } from './contexts/ModalContext'
import Modal from './common/Modal'
import { DataProvider } from './contexts/DataContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <ModalProvider>
      <DataProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
        <Modal />
      </DataProvider>
    </ModalProvider>
  )
}

export default App
