import { GiGuitarHead } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="w-full h-[80px] m-0 bg-[#333] flex items-center justify-around p-4">
      <p>
        <a
          href="/#sobreNosotros"
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Sobre Nosotros
        </a>
      </p>
      <p>
        <a
          href="/#dondeEstamos"
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Dónde Estamos
        </a>
      </p>
      <div className="flex items-center gap-5 text-[#E2AA11] text-5xl">
        <GiGuitarHead />
        <h2>difusa</h2>
      </div>
      <p>
        <a
          href="/#productos"
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Productos
        </a>
      </p>
      <p>
        <Link
          to={'/admin/instrumentos'}
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Configuración
        </Link>
      </p>
    </header>
  )
}

export default Header
