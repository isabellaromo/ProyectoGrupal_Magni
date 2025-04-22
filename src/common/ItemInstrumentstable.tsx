import { IoPencil, IoTrash } from 'react-icons/io5'
import { Instrumento } from '../types/Instrumento'

export default function ItemInstrumentstable({
  instrument,
}: {
  instrument: Instrumento
}) {
  return (
    <tr className="border-b-2 border-black/50 py-11">
      <td className=" px-4 rounded-r-md ">
        <img
          className="w-[120px]"
          src={instrument.imagen}
          alt={`Imágen del instrumento ${instrument.instrumento}`}
        />
      </td>
      <td className="px-4 rounded-r-md w-[200px]">{instrument.instrumento}</td>
      <td className="px-4 rounded-r-md text-center">{instrument.marca}</td>
      <td className="px-4 text-center">{instrument.modelo}</td>
      <td className="px-4 rounded-r-md text-center">{instrument.precio}</td>
      <td className="px-4 rounded-r-md text-center">
        {instrument.cantidadVendida}
      </td>
      <td className="px-4 rounded-r-md w-[300px]">
        <p className="max-h-12 overflow-hidden">{instrument.descripcion}</p>
        <span className="text-lg">...</span>
      </td>
      <td className="px-4 rounded-r-md text-center mr-4">
        <button>
          <IoPencil className="size-6" />
        </button>
        <button>
          <IoTrash className="size-6" />
        </button>
      </td>
    </tr>
  )
}
