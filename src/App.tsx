import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ModalProvider } from './contexts/ModalContext'

function App() {
  return (
    <ModalProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ModalProvider>
  )
}

export default App
