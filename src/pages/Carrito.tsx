import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../common/CartItem";
import Button from "../common/Button";
import { CartItemType } from "../types/CartItemType";
import { useNavigate } from "react-router-dom";

const Carrito: React.FC = () => {
    const {cart} = useContext(CartContext)
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(()=> {
        const newTotal = cart.reduce((acc, item) => {
            const envio = item.instrumento.costoEnvio !== "G" ? Number(item.instrumento.costoEnvio) : 0;
            return acc + item.instrumento.precio * item.cantidad + envio;
        }, 0)

        setTotal(newTotal)
    }, [cart])

    const handlePay = () =>{
        navigate('/carrito/step2')
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
            
            <Button handleClick={handlePay} width="w-[130px]" height="h-[40px]" text={"Pagar"} />
             </section>
    );
}

export default Carrito;