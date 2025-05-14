import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../common/CartItem";
import Button from "../common/Button";
import { CartItemType } from "../types/CartItemType";
import { PaymentBrick } from "../components/PaymentBrick";

const Carrito: React.FC = () => {
    const [toPay, setToPay] = useState(false)
    const {cart} = useContext(CartContext)
    const [total, setTotal] = useState<number>(0)
    console.log(cart)

    useEffect(()=> {
        const newTotal = cart.reduce((acc, item) => {
            const envio = item.instrumento.costoEnvio !== "G" ? Number(item.instrumento.costoEnvio) : 0;
            return acc + item.instrumento.precio * item.cantidad + envio;
        }, 0)

        setTotal(newTotal)
    }, [cart])

    const handlePay = () =>{
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
                            <CartItem detalle={item} toPay={toPay}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center mt-5 font-bold text-3xl">
                <p>Total: ${total}</p>
            </div>
            
            {toPay ? <PaymentBrick /> : <div className="w-full h-[50px] flex justify-center items-center my-5 ">
                <Button handleClick={handlePay} width="w-[130px]" height="h-[40px]" text={"Pagar"} />
                
            </div>}
            {toPay && <button className="w-max block px-4 rounded-md py-3 bg-[#E2AA11] cursor-pointer hover:bg-[#c9970e] transition-all mb-6 text-white font-semibold m-auto" onClick={()=>setToPay(false)}>Seguir Modificando el Carrito</button>}
        </section>
    );
}

export default Carrito;