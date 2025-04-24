import { Instrumento } from '../types/Instrumento'

export const createInstrumentInitialValues: Instrumento = {
  instrumento: '',
  marca: '',
  modelo: '',
  imagen: '',
  precio: 0,
  costoEnvio: 'G',
  cantidadVendida: 0,
  descripcion: '',
  categoria: 'cuerda',
}

export const formFields = [
  {
    label: 'Nombre',
    name: 'instrumento',
    placeholder: 'Guitarra',
    type: 'text',
  },
  {
    label: 'Marca',
    name: 'marca',
    placeholder: 'Yamaha',
    type: 'text',
  },
  {
    label: 'Modelo',
    name: 'modelo',
    placeholder: 'Acústica',
    type: 'text',
  },
  {
    label: 'Imágen',
    name: 'imagen',
    placeholder: 'https://mi-imagen.jpg',
    type: 'text',
  },
  {
    label: 'Precio',
    name: 'precio',
    placeholder: '30000',
    type: 'number',
  },
  {
    label: 'Costo de Envío',
    name: 'costoEnvio',
    placeholder: 'G = Gratuito',
    type: 'text',
  },
  {
    label: 'Descripción',
    name: 'descripcion',
    placeholder: 'Madera de alta calidad y sonido excepcional',
    type: 'text',
  },
  {
    label: 'Categoría',
    name: 'categoria',
    value: 'cuerda',
    type: 'select',
  },
]
