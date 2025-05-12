import { PedidoDetalle } from "./IPedidoDetalle";

export interface Pedido {
    id: number,
    fechaPedido: string,
    totalPedido: number,
    pedidoDetalle: PedidoDetalle[]
}

