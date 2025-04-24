import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Instrumento } from '../types/Instrumento'
import fetchHelper from '../helpers/fetchHelper'

const initialState: Instrumento[] = []

interface DataContextType {
  data: Instrumento[]
  setData: React.Dispatch<React.SetStateAction<Instrumento[]>>
  error?: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  loading?: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  reloadTrigger: boolean
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface DataProps {
  children: ReactNode
}

export const DataProvider = ({ children }: DataProps) => {
  const [data, setData] = useState<Instrumento[]>(initialState)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [reloadTrigger, setReloadTrigger] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchHelper().get(
          'http://localhost:8080/instrumentos'
        )
        setData(data)
      } catch (error: unknown) {
        setError(`Error al intentar traer los instrumentos. ${error}`)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [reloadTrigger])

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        error,
        loading,
        reloadTrigger,
        setReloadTrigger,
        setError,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('DataContext must be used whithin the DataContextProvider.')
  }

  return context
}
