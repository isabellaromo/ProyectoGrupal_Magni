import { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { CartItemType } from '../types/CartItemType'
import LoadingIcon from '../common/icons/LoadingIcon'

declare global {
  interface Window {
    MercadoPago: any
  }
}

export const PaymentBrick = () => {
  const { crearPedido } = useContext(CartContext)
  const brickContainerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const { setPedidoId } = useContext(CartContext)
  const pedido = crearPedido()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.onload = () => setIsReady(true)
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    setError(null)
    if (!isReady || !brickContainerRef.current) return

    //Credenciales de produccion de la cuenta del vendedor
    const mp = new window.MercadoPago(
      'APP_USR-67fd5276-47b9-4393-8e42-fb936b3a1e0e',
      { locale: 'es-AR' }
    )

    const loadBrick = async () => {
      setLoading(true)
      try {
        const pedidoDTO = {
          id: null,
          totalPedido: null,
          fechaPedido: null,
          pedidoDetalle: pedido.pedidoDetalle.map(item => ({
            cantidad: item.cantidad,
            instrumentoId: item.instrumentoId,
          })),
        }
        console.log(pedidoDTO)

        // 1. Crear preferencia en el backend
        const res = await fetch(
          'http://localhost:8080/payment/create-preference',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoDTO),
          }
        )

        if (!res.ok) {
          throw new Error(`${res.status}`)
        }

        const { pedidoId, preferenceId, totalPedido } = await res.json()

        console.log(totalPedido)
        if (setPedidoId) {
          setPedidoId(pedidoId)
        }

        //2. Renderizar Payment Brick
        const bricksBuilder = mp.bricks()
        bricksBuilder.create('wallet', 'paymentBrickContainer', {
          initialization: { amount: totalPedido, preferenceId: preferenceId },
          customization: {
            paymentMethods: {
              ticket: 'all',
              creditCard: 'all',
              prepaidCard: 'all',
              debitCard: 'all',
              mercadoPago: 'all',
            },
          },
          callbacks: {
            onReady: () => console.log('Payment Brick listo'),
          },
        })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error al intentar crear el pago. Error: ${err.message}`)
        } else {
          setError('Error desconocido al intentar crear el proceso de pago.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadBrick()
  }, [isReady])

  if (loading)
    return (
      <>
        <button className="w-[280px] h-[48px] rounded-lg bg-[#009ee3]  mt-[5px] flex justify-center items-center">
          {' '}
          <LoadingIcon className="size-6 animate-spin " />
        </button>
      </>
    )

  if (error) {
    return (
      <>
        <button className="w-[280px] h-[48px] rounded-lg bg-[#e30f00] text-white mt-[16px]">
          {error}
        </button>
      </>
    )
  }
  return <div id="paymentBrickContainer" ref={brickContainerRef}></div>
}
