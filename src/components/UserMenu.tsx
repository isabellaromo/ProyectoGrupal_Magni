import { authStore } from '../contexts/authStore'

const UserMenu = () => {
  const user = authStore(state => state.usuario)
  const logout = authStore(state => state.logout)

  return (
    <div className="relative group inline-block">
      <p className="text-[1.07rem] text-[#E2AA11] font-[Poppins] cursor-pointer">
        {user ? user.nombreUsuario : 'Bienvenido'}
      </p>

      {/* Dropdown */}
      {user && (
        <div className="absolute left-0 pt-2 hidden group-hover:block z-10 min-w-[120px]">
          <button
            onClick={logout}
            className="block w-full bg-white border border-gray-300 rounded shadow-md  text-left px-4 py-2 text-sm text-[#b18200] font-semibold hover:bg-gray-100  cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
