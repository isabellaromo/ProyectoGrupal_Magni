import { Instrumento } from '../types/Instrumento'

export const validateValues = (values: Instrumento): string | null => {
  const {
    instrumento,
    marca,
    modelo,
    imagen,
    precio,
    costoEnvio,
    cantidadVendida,
    descripcion,
    categoria,
  } = values

  // Validar strings no vacíos
  if (!instrumento.trim()) return 'El campo "instrumento" no puede estar vacío.'
  if (!marca.trim()) return 'El campo "marca" no puede estar vacío.'
  if (!modelo.trim()) return 'El campo "modelo" no puede estar vacío.'
  if (!imagen.trim()) return 'El campo "imagen" no puede estar vacío.'
  if (!descripcion.trim()) return 'El campo "descripción" no puede estar vacío.'
  if (!categoria.trim()) return 'El campo "categoria" no puede estar vacío.'

  // Validar números positivos o cero
  if (isNaN(precio) || precio < 1)
    return 'El precio debe ser un número mayor a 0.'
  if (isNaN(cantidadVendida) || cantidadVendida < 0)
    return 'La cantidad vendida debe ser un número mayor o igual a 0.'

  // Validar costoEnvio
  if (costoEnvio !== 'G') {
    const parsedCosto = Number(costoEnvio)
    if (isNaN(parsedCosto) || parsedCosto <= 0) {
      return 'El costo de envío debe ser "G" o un número mayor a 0.'
    }
  }

  return null // Todo OK
}
