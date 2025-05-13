import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItemType } from "../types/CartItemType";


interface PaymentBrickProps {
  detalles: CartItemType[]; 
  pedidoId: number; // El ID generado del pedido
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const PaymentBrick: React.FC<PaymentBrickProps> = ({ detalles }) => {
  const brickContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const {setPedidoId} = useContext(CartContext)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isReady || !brickContainerRef.current) return;

    const mp = new window.MercadoPago("TEST-97bdf431-9b81-4ec0-964b-0b49be595d23", { locale: "es-AR" });

    const loadBrick = async () => {

      const pedidoDTO = {
        id: null,
        totalPedido: null,
        fechaPedido: null,
        pedidoDetalle: detalles.map((item) => ({
          cantidad: item.cantidad,
          instrumentoId: item.instrumento.id,
        })),
      };

      console.log("PedidoDTO", pedidoDTO);
      // 1. Crear preferencia en el backend
      const res = await fetch("http://localhost:8080/payment/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoDTO),
      });
      const {pedidoId, preferenceId, totalPedido} = await res.json();
      
      // if (setPedidoId) {
      //   setPedidoId(pedidoId);
      // }

      //2. Renderizar Payment Brick
      console.log('HOLA')
      const bricksBuilder = mp.bricks();
      bricksBuilder.create("payment", "paymentBrickContainer", {
        initialization: { amount: totalPedido ,preferenceId: preferenceId, redirectMode: 'modal' },
        customization: {
          paymentMethods: {
          ticket: "all",
          creditCard: "all",
          prepaidCard: "all",
          debitCard: "all",
          mercadoPago: "all",
        },
        },
        callbacks: {
          onReady: () => console.log("Payment Brick listo"),
          onError: (error: any) => {
            console.error("Error en Payment Brick", error);
          },
          onPayment: async ({ payment }: any) => {
            const estado = payment.status;

            if (estado === "approved") {
              await fetch(`http://localhost:8080/payment/aprobar/${pedidoId}`, { method: "POST" })
              alert("¡Pago aprobado!");
            } else if (estado === "rejected") {
              await fetch(`http://localhost:8080/payment/rechazar/${pedidoId}`, { method: "POST" });
              alert("Pago rechazado");
            }
          },
        },
      });
      console.log('HOLA')
    };

    loadBrick();
  }, [isReady]);

  return <div id="paymentBrickContainer" ref={brickContainerRef}></div>;
};