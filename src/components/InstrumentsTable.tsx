import ItemInstrumentstable from '../common/ItemInstrumentstable'
import { IoReload } from 'react-icons/io5'
import { useDataContext } from '../contexts/DataContext'

const InstrumentsTable = () => {
  const { data, error, loading, reloadTrigger, setReloadTrigger } =
    useDataContext()
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/50">
      <thead className="border-b-[1px] border-zinc-600/50 text-xl">
        <tr>
          <th className="font-medium pl-6 text-center">Imágen</th>
          <th className="font-medium text-center">Instrumento</th>
          <th className="font-medium text-center">Marca</th>
          <th className="font-medium text-center">Modelo</th>
          <th className="font-medium text-center">Precio</th>
          <th className="font-medium text-center">Costo Envío</th>
          <th className="font-medium text-center">Categoría</th>
          <th className="font-medium text-center">Cant. Vendida</th>
          <th className="font-medium text-center">Descripción</th>
          <th className="font-medium text-end pr-6">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[13px]"></tr>
        {data.map((instrument, index) => {
          return <ItemInstrumentstable key={index} instrument={instrument} />
        })}
        {loading && (
          <tr>
            <td
              colSpan={9}
              className="text-center text-lg font-semibold text-[#E2AA11]"
            >
              Cargando...
            </td>
          </tr>
        )}
        {error && (
          <tr>
            <td
              colSpan={9}
              className="text-center text-lg font-semibold text-[#e24c11] "
            >
              <span>{error}</span>
              <button
                className="ml-2 cursor-pointer"
                onClick={() => {
                  setReloadTrigger(!reloadTrigger)
                }}
              >
                <IoReload className="size-6 self-center text-center inline" />
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default InstrumentsTable
