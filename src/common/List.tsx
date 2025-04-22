import { useEffect, useState } from "react"
import Item from "./Item"
import { ResponseData } from "../types/ResponseData"

const List = () => {
  const [listaInstrumentos, setListaInstrumentos] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(false);

  //Traemos los datos del JSON
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await fetch("/instrumentos.json")
        setLoading(true);

        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }

        const responseJSON: ResponseData = await response.json()

        if (responseJSON) {
          setListaInstrumentos(responseJSON)
          setLoading(false);
        } else {
          setListaInstrumentos(null)
        }

      } catch (error: unknown) {
        console.log("Hubo un error al realizar el fetch: ", error)
        setLoading(false);
      }
    }

    getData()
  }, [])


  if (loading) return <p>Cargando instrumentos...</p>;

  return (
    <div className="w-full flex justify-center">
      {listaInstrumentos ?
      (<ul className="list-none mt-10 flex flex-col">
        {listaInstrumentos.instrumentos.map(instrumento => (
          <li key={instrumento.id}> <Item instrumento={instrumento}/> </li>
        ))}
      </ul>) : (<p>No hay instrumentos disponibles</p>)}
    </div>
  )
}

export default List