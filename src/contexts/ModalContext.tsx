import { createContext, ReactNode, useContext, useState } from 'react'

interface ModalContextType {
  isOpen: boolean
  content: ReactNode | null
  openModal: (content: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface GlobalProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: GlobalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode | null>(null)

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent)
    setIsOpen(true)
  }

  const closeModal = () => {
    setContent(null)
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('ModalContext must be used within the ModalProvider.')
  }
  return context
}
