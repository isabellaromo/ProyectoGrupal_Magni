import { useState } from 'react'
import { useModalContext } from '../contexts/ModalContext'
import fetchHelper from '../helpers/fetchHelper'
import { useDataContext } from '../contexts/DataContext'

const DeleteInstrument = ({ name, id }: { name: string; id: number }) => {
  const { reloadTrigger, setReloadTrigger } = useDataContext()
  const { closeModal } = useModalContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String | null>(null)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetchHelper().del(
        `http://localhost:8080/instrumentos/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (response?.message === 'Instrumento eliminado') {
        setReloadTrigger(!reloadTrigger)
        closeModal()
      }
    } catch (error: unknown) {
      setError(`Error al eliminar el intrumento. ${error}`)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <h2
        className="text-xl font-semibold text-[#E2AA11]"
        style={{ fontFamily: 'Poppins' }}
      >
        ¿Eliminar {name}?
      </h2>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <nav className="w-full flex justify-center mt-6 gap-8 pb-2">
        {!isLoading && (
          <button
            onClick={() => {
              closeModal()
            }}
            className="bg-[#E2AA11] px-3 p-y-1 rounded-lg hover:bg-[#a78c11] cursor-pointer text-white font-semibold text-xl"
          >
            Cancelar
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-[#e23411] px-3 p-y-1 rounded-lg hover:bg-[#a71111] cursor-pointer text-white font-semibold text-xl"
        >
          {isLoading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </nav>
    </>
  )
}

export default DeleteInstrument
