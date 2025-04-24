import { IoPencil, IoTrash } from 'react-icons/io5'
import { Instrumento } from '../types/Instrumento'
import { useModalContext } from '../contexts/ModalContext'
import EditInstrument from '../components/EditInstrument'
import DeleteInstrument from '../components/DeleteInstrument'

export default function ItemInstrumentstable({
  instrument,
}: {
  instrument: Instrumento
}) {
  const { openModal } = useModalContext()
  return (
    <>
      <tr className="border-b-2 border-black/50 py-11">
        <td className=" px-4 rounded-r-md ">
          <img
            className="w-[120px]"
            src={instrument.imagen}
            alt={`Imágen del instrumento ${instrument.instrumento}`}
          />
        </td>
        <td className="px-4 rounded-r-md w-[200px]">
          {instrument.instrumento}
        </td>
        <td className="px-4 rounded-r-md text-center">{instrument.marca}</td>
        <td className="px-4 text-center">{instrument.modelo}</td>
        <td className="px-4 rounded-r-md text-center">{instrument.precio}</td>
        <td className="px-4 rounded-r-md text-center">
          {instrument.costoEnvio}
        </td>
        <td className="px-4 rounded-r-md text-center">
          {instrument.categoria}
        </td>
        <td className="px-4 rounded-r-md text-center">
          {instrument.cantidadVendida}
        </td>
        <td className="px-4 rounded-r-md w-[150px]">
          <p className="max-h-12 overflow-hidden">{instrument.descripcion}</p>
          <span className="text-lg">...</span>
        </td>
        <td className="px-4 rounded-r-md text-center mr-4">
          <button
            onClick={() =>
              openModal(<EditInstrument instrument={instrument} />)
            }
          >
            <IoPencil
              className="size-6 cursor-pointer"
              title="Editar"
              color="#6eac5c"
            />
          </button>
          <button
            onClick={() =>
              openModal(
                <DeleteInstrument
                  name={instrument.instrumento}
                  id={instrument.id ? instrument.id : 0}
                />
              )
            }
          >
            <IoTrash
              className="size-6 cursor-pointer"
              title="Eliminar"
              color="#b85252"
            />
          </button>
        </td>
      </tr>
    </>
  )
}
