import { FormField, Instrumento } from '../types/Instrumento'

export const createFormFields = (instrument: Instrumento): FormField[] => [
  {
    label: 'Nombre',
    name: 'instrumento',
    placeholder: 'Guitarra',
    type: 'text',
    value: instrument.instrumento,
  },
  {
    label: 'Marca',
    name: 'marca',
    placeholder: 'Yamaha',
    type: 'text',
    value: instrument.marca,
  },
  {
    label: 'Modelo',
    name: 'modelo',
    placeholder: 'Acústica',
    type: 'text',
    value: instrument.modelo,
  },
  {
    label: 'Imágen',
    name: 'imagen',
    placeholder: 'https://mi-imagen.jpg',
    type: 'text',
    value: instrument.imagen,
  },
  {
    label: 'Precio',
    name: 'precio',
    placeholder: '30000',
    type: 'number',
    value: instrument.precio,
  },
  {
    label: 'Costo de Envío',
    name: 'costoEnvio',
    placeholder: 'G = Gratuito',
    type: 'text',
    value: instrument.costoEnvio,
  },
  {
    label: 'Descripción',
    name: 'descripcion',
    placeholder: 'Madera de alta calidad y sonido excepcional',
    type: 'text',
    value: instrument.descripcion,
  },
]
