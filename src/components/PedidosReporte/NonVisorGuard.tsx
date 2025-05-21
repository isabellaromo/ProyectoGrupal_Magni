import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '../../contexts/authStore'

const NonVisorGuard = () => {
  const user = authStore(state => state.usuario)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.rol === 'Visor') {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default NonVisorGuard
