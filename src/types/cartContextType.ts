import { CartItemType } from "./CartItemType";
import { Instrumento } from "./Instrumento";
import { Pedido } from "./IPedido";

export interface CartContextType {
    cart: CartItemType[],
    addCarrito: (instrumento: Instrumento) => void,
    removeCarrito: (instrumentoId: number) => void,
    clearCarrito: () => void,
    decreaseCarrito: (instrumentoId: number) => void,
    // enviarPedido: () => Promise<void>;
    pedidoId?: number | null;
    setPedidoId?: (id: number | null) => void;
    crearPedido:() => Pedido
}