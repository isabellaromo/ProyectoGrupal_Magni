import { GiGuitarHead } from 'react-icons/gi'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { authStore } from '../contexts/authStore'
import UserMenu from './UserMenu'

const Header: React.FC = () => {
  const { cart } = useContext(CartContext)
  const [open, setOpen] = useState(false)

  const user = authStore(state => state.usuario)

  if (user?.rol !== 'Admin') return null


  return (
    <header className="w-full h-[80px] text-sm m-0 bg-[#333] flex items-center justify-around p-4">
      <p>
        <a
          href="/#dondeEstamos"
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Dónde Estamos
        </a>
      </p>
      <p>
        <a
          href="/#productos"
          className="text-[#E2AA11] no-underline font-[Poppins] hover:text-white hover:underline hover:cursor-pointer hover:transition hover:duration-300"
        >
          Productos
        </a>
      </p>
      <Link to="/">
        <div className="flex items-center gap-5 text-[#E2AA11] text-5xl">
          <GiGuitarHead />
          <h2>difusa</h2>
        </div>
      </Link>
      <Link to={'/carrito'}>
        <div className="flex items-center gap-5 text-[#E2AA11] text-xl">
          <FaShoppingCart />
          <p>{cart.length > 0 && cart.length}</p>
        </div>
      </Link>
<div className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-[#E2AA11] font-[Poppins] hover:text-white hover:underline transition duration-300"
      >
        Configuración
      </button>

      {open && (
        <div className="absolute mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 w-48">
          <Link
            to="/admin/instrumentos"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            ABM
          </Link>
          <Link
            to="/admin/charts"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Estadísticas
          </Link>
        </div>
      )}
    </div>
      <UserMenu />
    </header>
  )
}

export default Header
