import { createContext, ReactNode, useEffect, useState } from "react";
import { CartContextType } from "../types/cartContextType";
import { Instrumento } from "../types/Instrumento";
import { CartItemType } from "../types/CartItemType";

export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    removeCarrito: () => {},
    clearCarrito: () => {},
    decreaseCarrito: () => {}
});


export const CartProvider = ({children} : {children: ReactNode}) => {
    
    const [cart, setCart] = useState<CartItemType[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    })

    //Guarda el carrito en localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCarrito = (newInstrumento: Instrumento) => {
        if (newInstrumento){
            const existe = cart.find(detalle => detalle.instrumento.id === newInstrumento.id)

            if (existe) {
                setCart(prevCart =>
                    prevCart.map(item =>
                        item.instrumento.id === newInstrumento.id
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    )
                );
            } else {
                setCart(prevCart => [...cart, {instrumento: newInstrumento, cantidad: 1}])
            }
        }
    }

    const decreaseCarrito = (instrumentoId: number) => {
        const existe = cart.find(detalle => detalle.instrumento.id === instrumentoId)

        if (existe){
            setCart(prevCart =>
                prevCart.map(item =>
                    item.instrumento.id === instrumentoId
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter(item => item.cantidad > 0)
            );
        }
    }

    const removeCarrito = (instrumentoId: number) => {
        const newCarrito = cart.filter((item) => item.instrumento.id !== instrumentoId)
        setCart(newCarrito)
    }

    const clearCarrito = () => {
        setCart([])
    }

	return (
        <CartContext.Provider value={{cart, addCarrito, decreaseCarrito, removeCarrito, clearCarrito}}>
            {children}
        </CartContext.Provider>
    );
}