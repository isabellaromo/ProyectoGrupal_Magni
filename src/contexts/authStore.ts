import { create } from 'zustand'

type Usuario = {
  id: number
  nombreUsuario: string
  rol: 'Admin' | 'User' | string
}

interface AuthState {
  usuario: Usuario | null
  login: (usuario: Usuario) => void
  logout: () => void
}

const storedUser = sessionStorage.getItem('usuario')
const initialUsuario = storedUser ? JSON.parse(storedUser) : null

export const authStore = create<AuthState>(set => ({
  usuario: initialUsuario,
  login: usuario => {
    sessionStorage.setItem('usuario', JSON.stringify(usuario))
    set({ usuario })
  },
  logout: () => {
    sessionStorage.removeItem('usuario')
    set({ usuario: null })
  },
}))
