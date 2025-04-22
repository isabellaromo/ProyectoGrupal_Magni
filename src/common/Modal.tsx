import { MouseEvent, ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModalContext } from '../contexts/ModalContext'
import { IoClose } from 'react-icons/io5'

interface Props {
  children: ReactNode
}

const eventListener = 'keydown'
const Modal = ({ children }: Props) => {
  const { state, setState } = useModalContext()
  const modalRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById('modal')

  const closeModal = () => {
    setState(false)
  }

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    if (state) {
      document.addEventListener(eventListener, handleEsc)
    }
    return () => {
      document.removeEventListener(eventListener, handleEsc)
    }
  }, [setState, state])

  if (!state || !modalRoot) {
    return null
  }

  return createPortal(
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg pt-8 px-8 pb-2 shadow-lg max-h-[100vh] overflow-y-auto"
        onClick={handleContentClick}
      >
        <button
          onClick={closeModal}
          className="border-1 rounded-full items-center absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
        >
          <IoClose className="size-6" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
