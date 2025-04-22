import { useEffect, useState } from 'react'
import { Instrumento } from '../types/Instrumento'
import ItemInstrumentstable from '../common/ItemInstrumentstable'
import { IoReload } from 'react-icons/io5'

const InstrumentsTable = () => {
  const [data, setData] = useState<Instrumento[]>([])
  const [reloadTrigger, setReloadTrigger] = useState<number>(0)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:8080/instrumentos')
        if (!response.ok) {
          throw new Error(`${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error: unknown) {
        setError(
          new Error(`Error al intentar traer los instrumentos. ${error}`)
        )
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [reloadTrigger])
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/50">
      <thead className="border-b-[1px] border-zinc-600/50 text-xl">
        <tr>
          <th className="font-medium pl-6 text-center">Imágen</th>
          <th className="font-medium text-center">Instrumento</th>
          <th className="font-medium text-center">Marca</th>
          <th className="font-medium text-center">Modelo</th>
          <th className="font-medium text-center">Precio</th>
          <th className="font-medium text-center">Cant. Vendida</th>
          <th className="font-medium text-center">Descripción</th>
          <th className="font-medium text-center pr-6">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[13px]"></tr>
        {data.map(instrument => {
          return <ItemInstrumentstable instrument={instrument} />
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
              <span>{error.message}</span>
              <button
                className="ml-2 cursor-pointer"
                onClick={() => setReloadTrigger(reloadTrigger + 1)}
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
