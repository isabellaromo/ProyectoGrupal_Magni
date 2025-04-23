import { useModalContext } from '../contexts/ModalContext'
import fetchHelper from '../helpers/fetchHelper'

const DeleteInstrument = ({ name, id }: { name: string; id: number }) => {
  const { closeModal } = useModalContext()

  const handleDelete = () => {
    // fetchHelper().put('http://localhost:8080/instrumentos', {})
  }
  return (
    <>
      <h2
        className="text-xl font-semibold text-[#E2AA11]"
        style={{ fontFamily: 'Poppins' }}
      >
        ¿Eliminar {name}?
      </h2>
      <nav className="w-full flex justify-center mt-6 gap-8 pb-2">
        <button
          onClick={() => {
            closeModal()
          }}
          className="bg-[#E2AA11] px-3 p-y-1 rounded-lg hover:bg-[#a78c11] cursor-pointer text-white font-semibold text-xl"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          className="bg-[#e23411] px-3 p-y-1 rounded-lg hover:bg-[#a71111] cursor-pointer text-white font-semibold text-xl"
        >
          Eliminar
        </button>
      </nav>
    </>
  )
}

export default DeleteInstrument
