import { useEffect, useRef, useState } from "react";

type DetallePedidoDto = {
  instrumentoId: number;
  cantidad: number;
};

interface PaymentBrickProps {
  detalles: DetallePedidoDto[];
  pedidoId: number; // El ID generado del pedido
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const PaymentBrick: React.FC<PaymentBrickProps> = ({ detalles, pedidoId }) => {
  const brickContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

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
      // 1. Crear preferencia en el backend
      const res = await fetch("http://localhost:8080/payment/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detalles),
      });

      const { id: preferenceId } = await res.json();

      // 2. Renderizar Payment Brick
      mp.bricks().create("payment", "paymentBrickContainer", {
        initialization: { preferenceId },
        customization: {
          paymentMethods: {
            ticket: "all", // efectivo
            bank_transfer: "all", // transferencia
            credit_card: "all",
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
              await fetch(`/payment/confirmar/${pedidoId}`, { method: "POST" });
              alert("¡Pago aprobado!");
            } else if (estado === "rejected") {
              await fetch(`/payment/rechazar/${pedidoId}`, { method: "POST" });
              alert("Pago rechazado");
            }
          },
        },
      });
    };

    loadBrick();
  }, [isReady]);

  return <div id="paymentBrickContainer" ref={brickContainerRef}></div>;
};