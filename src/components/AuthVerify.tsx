import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '../contexts/authStore'

const AuthVerify = () => {
  const user = authStore(state => state.usuario)

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AuthVerify
