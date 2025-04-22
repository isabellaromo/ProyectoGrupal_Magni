import { Link } from "react-router-dom"
import Camion from "/img/camion.png"
import { Instrumento } from "../types/Instrumento"
import Button from "../common/Button"

const Item = ({ instrumento }: { instrumento: Instrumento }) => {

  return (
    <>
    <div className="h-[200px] w-[650px] flex flex-col">
      <div className="h-[95%] w-full flex gap-3 justify-start items-center">
        <div className="flex justify-center items-center">
          <img className="w-[80%]" src={`/img/${instrumento.imagen}`} alt={`Imagen de ${instrumento.descripcion}`} />
        </div>
        <div className="h-full flex flex-col gap-1 justify-center">
          <h3 className="text-lg text-gray-800 font-light">{instrumento.instrumento}</h3>
          <p className="text-2xl font-medium">${instrumento.precio}</p>
          <p className={`${instrumento.costoEnvio === "G" ? "text-green-600 flex items-center gap-2 my-2" : "text-orange-600"} text-sm mt-3`}>
            {instrumento.costoEnvio === "G" ? (
            <>
              <img src={Camion} alt="Icono de camión" />
              Envío gratis a todo el país
            </>
            ) : (
              <>Costo de envío: ${instrumento.costoEnvio}</>
            )}
</p>
          <p className="text-sm text-gray-500">{instrumento.cantidadVendida} vendidos</p>
          <div>
            <Link to={`/detalle/${instrumento.id}`}>
              <Button text={"Ver detalle"} width="w-100px" height="h-30px" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-[5%] mt-5 text-gray-200"/>
    </div>
    </>
  )
}

export default Item