import { CartItemType } from "./CartItemType";
import { Instrumento } from "./Instrumento";

export interface CartContextType {
    cart: CartItemType[],
    addCarrito: (instrumento: Instrumento) => void,
    removeCarrito: (instrumentoId: number) => void,
    clearCarrito: () => void,
    decreaseCarrito: (instrumentoId: number) => void
}