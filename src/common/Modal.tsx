import { MouseEvent, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModalContext } from '../contexts/ModalContext'
import { IoClose } from 'react-icons/io5'

const Modal = () => {
  const { isOpen, content, closeModal } = useModalContext()
  const modalRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById('modal')

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, closeModal])

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg pt-4 px-8 pb-2 shadow-lg max-h-[100vh] overflow-y-auto w-[400px]"
        onClick={handleContentClick}
      >
        <button
          onClick={closeModal}
          className="border-1 rounded-full items-center absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
        >
          <IoClose className="size-6" />
        </button>
        {content}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
