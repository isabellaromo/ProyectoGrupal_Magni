import { PedidoDetalle } from "./IPedidoDetalle";

export interface Pedido {
    id: number | null,
    fechaPedido: string,
    totalPedido: number,
    pedidoDetalle: PedidoDetalle[]
}

