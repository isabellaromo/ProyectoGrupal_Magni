import { useEffect, useState } from "react"
import Item from "./Item"
import { Instrumento } from "../types/Instrumento"

const List = () => {
  const [listaInstrumentos, setListaInstrumentos] = useState<Instrumento[]>([])
  const [loading, setLoading] = useState(false);

  //Traemos los datos del JSON
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:8080/instrumentos")
        setLoading(true);

        if (!response.ok) {
          throw new Error(`Status ${response.status}`)
        }

        const responseJSON: Instrumento[] = await response.json()

        if (responseJSON) {
          setListaInstrumentos(responseJSON)
          setLoading(false);
        } else {
          setListaInstrumentos([])
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
        {listaInstrumentos.map(instrumento => (
          <li key={instrumento.id}> <Item instrumento={instrumento}/> </li>
        ))}
      </ul>) : (<p>No hay instrumentos disponibles</p>)}
    </div>
  )
}

export default List