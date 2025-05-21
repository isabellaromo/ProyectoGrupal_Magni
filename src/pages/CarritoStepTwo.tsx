import { useContext } from 'react'
import { PaymentBrick } from '../components/PaymentBrick'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import ArrowLeftIcon from '../common/icons/ArrowLeftIcon'

export const CarritoStepTwo = () => {
  const { cart } = useContext(CartContext)
  return (
    <>
      <div className="h-full flex items-center justify-center mb-6">
        <div>
          <h3 className="titulo-seccion">PROCESO DE PAGO</h3>
        </div>
      </div>
      <article className="bg-gray-800/70 shadow-2xl p-6 max-w-[500px] m-auto text-white rounded-2xl">
        <ul className="flex flex-col gap-2">
          {cart.map((item, index) => (
            <li
              key={`item en resumen pedido ${index}`}
              className="flex justify-between gap-2"
            >
              <span>{item.instrumento.instrumento}</span>
              <span>x{item.cantidad}</span>
            </li>
          ))}
        </ul>
      </article>
      <nav className="flex gap-2 justify-center items-start pt-4">
        <Link
          to="/carrito"
          className="flex gap-2 items-center bg-[#009ee3] px-3 py-2 w-max mt-[5px] rounded-lg font-semibold text-white"
        >
          <ArrowLeftIcon className="size-8" />
          Editar Carrito
        </Link>
        <PaymentBrick />
      </nav>
      <p className="text-lg text-center text-[#009ee3] font-semibold">
        Una vez se acredite el pago, serás redirigido de nuevo a nuestro sitio.
      </p>
    </>
  )
}
