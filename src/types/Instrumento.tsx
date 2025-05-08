export interface Instrumento {
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
export type FormField = {
  label: string
  name: string
  placeholder?: string
  type: string
  value?: string | number
}
