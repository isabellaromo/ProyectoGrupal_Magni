import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ModalProvider } from './contexts/ModalContext'
import Modal from './common/Modal'

function App() {
  return (
    <ModalProvider>
      <Router>
        <AppRoutes />
      </Router>
      <Modal />
    </ModalProvider>
  )
}

export default App
