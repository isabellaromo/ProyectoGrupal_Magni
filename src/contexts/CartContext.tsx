import { createContext, ReactNode, useEffect, useState } from "react";
import { CartContextType } from "../types/cartContextType";
import { Instrumento } from "../types/Instrumento";
import { CartItemType } from "../types/CartItemType";
import Swal from "sweetalert2";

export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    removeCarrito: () => {},
    clearCarrito: () => {},
    decreaseCarrito: () => {},
    enviarPedido: async () => {}, // agregado
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItemType[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCarrito = (newInstrumento: Instrumento) => {
        if (newInstrumento) {
            const existe = cart.find(detalle => detalle.instrumento.id === newInstrumento.id);
            if (existe) {
                setCart(prevCart =>
                    prevCart.map(item =>
                        item.instrumento.id === newInstrumento.id
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    )
                );
            } else {
                setCart(prevCart => [...prevCart, { instrumento: newInstrumento, cantidad: 1 }]);
            }
        }
    };

    const decreaseCarrito = (instrumentoId: number) => {
        const existe = cart.find(detalle => detalle.instrumento.id === instrumentoId);
        if (existe) {
            setCart(prevCart =>
                prevCart
                    .map(item =>
                        item.instrumento.id === instrumentoId
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : item
                    )
                    .filter(item => item.cantidad > 0)
            );
        }
    };

    const removeCarrito = (instrumentoId: number) => {
        const newCarrito = cart.filter(item => item.instrumento.id !== instrumentoId);
        setCart(newCarrito);
    };

    const clearCarrito = () => {
        setCart([]);
    };

    const enviarPedido = async () => {
        try {
            const pedidoDetalle = cart.map(item => ({
                cantidad: item.cantidad,
                instrumentoId: item.instrumento.id,
            }));

            console.log(pedidoDetalle)

            const response = await fetch("http://localhost:8080/pedido", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pedidoDetalle })
            });

            if (!response.ok) {
                throw new Error("Error al enviar el pedido");
            }

            const data = await response.json();
            clearCarrito()
           Swal.fire("Compra realizada!", `El ID de tu pedido es : ${data.id}`, "success")
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addCarrito,
                decreaseCarrito,
                removeCarrito,
                clearCarrito,
                enviarPedido, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
