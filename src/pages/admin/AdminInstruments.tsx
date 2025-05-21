import { IoMdAdd } from 'react-icons/io'
import InstrumentsTable from '../../components/InstrumentsTable'
import { useModalContext } from '../../contexts/ModalContext'
import CreateInstrument from '../../components/CreateInstrument'
import { useDataContext } from '../../contexts/DataContext'
import fetchHelper from '../../helpers/fetchHelper'

const AdminInstruments = () => {
  const { openModal } = useModalContext()
  const { setData, setError, setLoading, reloadTrigger, setReloadTrigger } =
    useDataContext()

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value

    try {
      setLoading(true)

      if (selectedValue === 'ALL') {
        setReloadTrigger(!reloadTrigger)
      } else {
        const data = await fetchHelper().get(
          `http://localhost:8080/instrumentos/categoria/${selectedValue}`
        )
        setData(data)
      }
    } catch (error) {
      setError(`${error}`)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen mt-24">
      <nav className="w-full border-b border-[#E2AA11] flex justify-between px-5 py-1">
        <h1
          className="text-3xl uppercase font-bold text-[#E2AA11]  "
          style={{ fontFamily: 'Poppins' }}
        >
          <span>Lista de Instrumentos</span>
        </h1>
        <select
          name="categoria"
          className="border rounded-md px-2 w-[200px] text-center  font-bold"
          defaultValue="ALL"
          onChange={handleSelectChange}
        >
          <option value="ALL">TODOS</option>
          <option value="CUERDA">CUERDA</option>
          <option value="VIENTO">VIENTO</option>
          <option value="PERCUSION">PERCUSION</option>
          <option value="TECLADO">TECLADO</option>
          <option value="ELECTRONICO">ELECTRONICO</option>
        </select>
        <button
          className="bg-[#E2AA11] text-white py-2 px-4 rounded ml-5 cursor-pointer flex items-center gap-2 hover:bg-[#a78c11]"
          onClick={() => openModal(<CreateInstrument />)}
        >
          <IoMdAdd className="size-6 rounded-full border" />
          Agregar Instrumento
        </button>
      </nav>
      <InstrumentsTable />
    </section>
  )
}

export default AdminInstruments
