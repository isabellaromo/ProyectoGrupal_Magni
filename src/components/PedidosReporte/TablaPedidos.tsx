"use client"

import { useEffect, useMemo, useState } from "react"
import DateFilterCalendar from "./DateFilterCalendar"
import { filterByDateRange } from "../../utils/filterByDateRange"
import GenericTable from "./GenericTable"
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

type PedidoDetalle = {
    instrumentoId: number
    cantidad: number
}

type Pedido = {
    id: number
    totalPedido: number
    fechaPedido: string
    pedidoDetalle: PedidoDetalle[]
}

type Instrumento = {
    id: number
    instrumento: string
    marca: string
    modelo: string
    imagen: string
    precio: number
    costoEnvio: string
    cantidadVendida: number
    descripcion: string
    categoria: string
}

const TablaPedidos = () => {
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    })
    const [pedidosData, setPedidosData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const pedidosTableColumns = [
        { label: "Fecha Pedido", key: "fecha" },
        { label: "Instrumento", key: "instrumento" },
        { label: "Marca", key: "marca" },
        { label: "Modelo", key: "modelo" },
        { label: "Cantidad", key: "cantidad" },
        { label: "Precio", key: "precio" },
        { label: "Subtotal", key: "subtotal" },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resPedidos, resInstrumentos] = await Promise.all([
                    fetch("http://localhost:8080/pedido"),
                    fetch("http://localhost:8080/instrumentos")
                ])

                if (!resPedidos.ok || !resInstrumentos.ok) {
                    throw new Error("Error al cargar los datos")
                }

                const pedidos: Pedido[] = await resPedidos.json()
                const instrumentos: Instrumento[] = await resInstrumentos.json()

                // Map de instrumentos por ID para lookup rápido
                const instrumentosMap = new Map<number, Instrumento>()
                instrumentos.forEach(instr => {
                    instrumentosMap.set(instr.id, instr)
                })

                // Inner join: combinamos cada detalle de pedido con su instrumento
                const tablaFormateada = pedidos.flatMap(pedido =>
                    pedido.pedidoDetalle.map(detalle => {
                        const info = instrumentosMap.get(detalle.instrumentoId)
                        if (!info) return null // No se encontró instrumento, omitir

                        return {
                            fecha: pedido.fechaPedido,
                            instrumento: info.instrumento,
                            marca: info.marca,
                            modelo: info.modelo,
                            cantidad: detalle.cantidad,
                            precio: info.precio,
                            subtotal: info.precio * detalle.cantidad,
                        }
                    }).filter(Boolean) // Quita los null
                )

                setPedidosData(tablaFormateada)
                setLoading(false)
            } catch (err: any) {
                setError(err.message || "Error desconocido")
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const exportToExcel = () => {
        if (!pedidosFiltrados || pedidosFiltrados.length === 0) return

        const dataToExport = pedidosFiltrados.map((item: any) => ({
            Fecha: item.fecha,
            Instrumento: item.instrumento,
            Marca: item.marca,
            Modelo: item.modelo,
            Cantidad: item.cantidad,
            Precio: item.precio,
            Subtotal: item.subtotal,
        }))

        const worksheet = XLSX.utils.json_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(blob, 'pedidos_filtrados.xlsx')
    }

    const pedidosFiltrados = useMemo(() => {
        if (!pedidosData) return []

        // Si el usuario no modificó el rango, mostramos todo
        const today = new Date()
        const mismoDia =
            dateRange.startDate.toDateString() === today.toDateString() &&
            dateRange.endDate.toDateString() === today.toDateString()

        return mismoDia ? pedidosData : filterByDateRange(pedidosData, dateRange)
    }, [pedidosData, dateRange])

    const borrarFiltros = () => {
        const hoy = new Date()
        setDateRange({ startDate: hoy, endDate: hoy })
    }

    return (
        <div className="flex flex-col items-center m-4">
            <div className="flex items-center">
                <DateFilterCalendar dateRange={dateRange} onChange={setDateRange} />
                <div className="flex gap-4 my-4">
                    <button
                        onClick={borrarFiltros}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Borrar filtros
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-[#c04d00] text-white rounded hover:bg-green-600"
                    >
                        EXPORTAR EN EXCEL
                    </button>
                </div>
            </div>
            <GenericTable
                columns={pedidosTableColumns}
                data={pedidosFiltrados}
                error={error}
                isLoading={loading}
                dataType="pedidos"
            />
        </div>
    )
}

export default TablaPedidos
