import { Link } from 'react-router-dom'

const RejectedPayment = () => {
  return (
    <article className="h-full flex justify-center items-center flex-col gap-8 pt-12">
      <h1 className="text-3xl uppercase font-bold text-red-500">
        TU PEDIDO NO FUE PROCESADO CON EXITO
      </h1>
      <p className="font-bold uppercase text-3xl text-[#E2AA11] flex flex-col gap-2 items-center">
        Por favor, vuelve a intentarlo
      </p>
      <nav className="flex gap-4">
        <Link
          className="px-3 py-2 rounded-xl shadow-lg text-white bg-[#E2AA11] hover:bg-[#e28e11] font-semibold transition-all"
          to="/"
        >
          Volver al inicio
        </Link>
        <Link
          className="px-3 py-2 rounded-xl shadow-lg text-white bg-[#E2AA11] hover:bg-[#e28e11] font-semibold transition-all"
          to="/carrito"
        >
          Ir a Carrito
        </Link>
      </nav>
    </article>
  )
}

export default RejectedPayment
