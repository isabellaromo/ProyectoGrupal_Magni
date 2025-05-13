import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../common/CartItem";
import Button from "../common/Button";
import { CartItemType } from "../types/CartItemType";
import { PaymentBrick } from "../components/PaymentBrick";

const Carrito: React.FC = () => {
    const [toPay, setToPay] = useState(false)
    const {cart, enviarPedido} = useContext(CartContext)
    const [total, setTotal] = useState<number>(0)

    useEffect(()=> {
        const newTotal = cart.reduce((acc, item) => {
            const envio = item.instrumento.costoEnvio !== "G" ? Number(item.instrumento.costoEnvio) : 0;
            return acc + item.instrumento.precio * item.cantidad + envio;
        }, 0)

        setTotal(newTotal)
    }, [cart])

    const handleEnviarPedido = () =>{
        setToPay(true)
    }

    if (cart.length === 0) {
        return (
            <section className="h-full w-full">
                <div className="h-full flex items-center justify-center">
                    <div>
                        <h3 className="titulo-seccion">TU CARRITO</h3>
                        <p className="my-8 text-center">No tienes nada en tu carrito.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="h-full w-full">
            <div className="h-full flex items-center justify-center">
                <h3 className="titulo-seccion">TU CARRITO</h3>
            </div>
            <div>
                <ul>
                    {cart.map((item: CartItemType) => (
                        <li key={item.instrumento.id} >
                            <CartItem detalle={item}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center mt-5 font-bold text-3xl">
                <p>Total: ${total}</p>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center my-5 ">
                <Button handleClick={handleEnviarPedido} width="w-[130px]" height="h-[40px]" text={"Pagar"} />
                
            </div>
            {toPay && <PaymentBrick detalles={[{instrumentoId:1, cantidad:2}]} pedidoId={2}/>}
        </section>
    );
}

export default Carrito;