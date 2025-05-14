import { useContext } from "react"
import { CartItemType } from "../types/CartItemType"
import Button from "./Button"
import Camion from "/img/camion.png"
import { CartContext } from "../contexts/CartContext"
import { FaTrash } from "react-icons/fa";


const CartItem = ({detalle, toPay}: {detalle: CartItemType, toPay: boolean}) => {

    const {decreaseCarrito, addCarrito, removeCarrito} = useContext(CartContext)

    return (
      <div className="h-[100px] w-full flex flex-col items-center">
        <div className="h-[95%] w-[700px] flex justify-between items-center mt-3 border-1 border-[#E2AA11]">
          <div className="h-full w-[50%] flex gap-5  p-5">
            <img className="scale-[0.8]" src={`${detalle.instrumento.imagen}`} alt={`Imagen de ${detalle.instrumento.descripcion}`} />
            <h3 className="text-md text-gray-800 font-light">{detalle.instrumento.instrumento}</h3>
          </div>
          <div className="flex gap-4 items-center border-1 border-gray-300 rounded-lg">
            {!toPay && <Button
              handleClick={() => decreaseCarrito(detalle.instrumento.id)}
              text="-"
              width="w-[30px]"
              height="h-[30px]"
              bgColor="bg-[#E2AA11]"
              hoverColor="bg-[#e27d11]"/>}
              <p className="min-w-8 text-center">{detalle.cantidad}</p>
              {!toPay && 
              <Button
                handleClick={() => addCarrito(detalle.instrumento)}
                text="+"
                width="w-[30px]"
                height="h-[30px]"
                bgColor="bg-[#E2AA11]"
                hoverColor="bg-[#e27d11]"/>
              }
          </div>

          <div>
            {!toPay &&
          <Button
              handleClick={() => removeCarrito(detalle.instrumento.id)}
              text={<FaTrash/>}
              width="w-[30px]"
              height="h-[30px]"
              bgColor="bg-red-500"
              hoverColor="bg-red-800"/> }
          </div>

          <div className="h-full border-l-1 border-[#E2AA11] p-2 text-right">
            <p className="text-sm self-end text-gray-700 italic mt-2">${detalle.instrumento.precio} x {detalle.cantidad}</p>
            <p className={`${detalle.instrumento.costoEnvio === "G" ? "text-green-600 flex items-center justify-end" : "text-orange-600"} self-end text-sm`}>
              {detalle.instrumento.costoEnvio === "G" ? (
              <>
                <img src={Camion} alt="Icono de camión" />
                Envío: gratis
              </>
              ) : (
                <>Envío: ${detalle.instrumento.costoEnvio}</>
              )}
            </p>
            <p className="text-lg self-end text-[#E2AA11]">Subtotal: ${(detalle.instrumento.precio * detalle.cantidad) + (detalle.instrumento.costoEnvio != "G" ? Number(detalle.instrumento.costoEnvio) : 0)}</p>
          </div>
        </div>
        <hr className="h-[5%] mt-5 text-gray-200"/>
      </div>

    )
}

export default CartItem