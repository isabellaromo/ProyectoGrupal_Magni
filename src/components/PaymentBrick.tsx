import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItemType } from "../types/CartItemType";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const PaymentBrick = () => {
  const { crearPedido, setPedidoId } = useContext(CartContext);
  const brickContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const pedido = crearPedido();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      console.log("✅ SDK de Mercado Pago cargado");
      setIsReady(true);
    };
    document.body.appendChild(script);

    console.log("📦 Pedido generado:");
    pedido.pedidoDetalle.forEach((item) => console.log(item));
  }, []);

  useEffect(() => {
    if (!isReady || !brickContainerRef.current) return;

    const mp = new window.MercadoPago("TEST-f649bc2e-7b2c-41b3-91e0-704c57f2697a", {
      locale: "es-AR",
    });

    const loadBrick = async () => {
      const pedidoDTO = {
        id: null,
        totalPedido: null,
        fechaPedido: null,
        pedidoDetalle: pedido.pedidoDetalle.map((item) => ({
          cantidad: item.cantidad,
          instrumentoId: item.instrumentoId,
        })),
      };

      console.log("📨 Enviando pedido al backend:", pedidoDTO);

      try {
        const res = await fetch("http://localhost:8080/payment/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedidoDTO),
        });

        if (!res.ok) throw new Error("Error al crear preferencia");

        const { pedidoId, preferenceId, totalPedido } = await res.json();

        console.log("✅ Preferencia creada:");
        console.log("🆔 pedidoId:", pedidoId);
        console.log("💵 totalPedido:", totalPedido);
        console.log("🧾 preferenceId:", preferenceId);

        if (setPedidoId) setPedidoId(pedidoId);

        const bricksBuilder = mp.bricks();

        console.log("🧱 Intentando renderizar Payment Brick");
        console.log("➡️ Contenedor existe:", !!brickContainerRef.current);

        await bricksBuilder.create("wallet", "paymentBrickContainer", {
          initialization: {
            amount: totalPedido,
            preferenceId: preferenceId,
            redirectMode: "modal", // podés probar con "blank" para testing
          },
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
            onReady: () => {
              console.log("✅ onReady: Payment Brick listo");
            },
            onPayment: async ({ payment }: any) => {
              console.log("💰 onPayment ejecutado");
              console.log("🧾 Payment info:", payment);
              console.log("✅ payment_id:", payment.id);
              console.log("🔁 status:", payment.status);

              try {
                await fetch(`http://localhost:8080/payment/confirmar`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    paymentId: payment.id,
                    pedidoId: pedidoId,
                  }),
                });
                console.log("📬 Confirmación enviada al backend");
              } catch (error) {
                console.error("❌ Error al confirmar el pago:", error);
              }
            },
          },
        });
      } catch (error) {
        console.error("❌ Error en loadBrick:", error);
      }
    };

    loadBrick();
  }, [isReady]);

  return (
    <div className="w-max m-auto">
      {/* Contenedor requerido por Mercado Pago */}
      <div id="paymentBrickContainer" ref={brickContainerRef}></div>
    </div>
  );
};