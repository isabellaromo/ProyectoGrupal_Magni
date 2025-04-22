import { createContext, ReactNode, useContext, useState } from 'react'
import { ModalContextType } from '../types/modalContextType'

const initialState: boolean = false

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface GLobalProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: GLobalProps) => {
  const [state, setState] = useState<boolean>(initialState)

  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error(
      'ModalContext must be used whithin the ModalContextProvider.'
    )
  }

  return context
}
