import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '../contexts/authStore'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const user = authStore(state => state.usuario)

  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children || <Outlet />}</>
}

export default AuthGuard
