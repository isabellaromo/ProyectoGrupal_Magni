export interface IGenericTableProps<T> {
  dataType: string
  columns: ITableColumn<T>[]
  data: any[]
  isLoading: boolean
  error: string | null
}

interface ITableColumn<T> {
  label: string
  key: string //la key de cada columna y el atributo del objeto que se renderizará en esa celda deben llamarse IGUAL
}
