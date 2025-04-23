import { IoMdAdd } from 'react-icons/io'
import InstrumentsTable from '../components/InstrumentsTable'
import { useModalContext } from '../contexts/ModalContext'
import CreateInstrument from '../components/CreateInstrument'

const AdminInstruments = () => {
  const { openModal } = useModalContext()

  return (
    <section className="min-h-screen mt-24">
      <nav className="w-full border-b border-[#E2AA11] flex justify-between px-5 py-1">
        <h1
          className="text-3xl uppercase font-bold text-[#E2AA11]  "
          style={{ fontFamily: 'Poppins' }}
        >
          <span>Lista de Instrumentos</span>
        </h1>
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
