import { Instrumento } from "../types/Instrumento"
import Camion from "/img/camion.png"
import { Link } from 'react-router-dom';

interface ItemProps {
    item: Instrumento;
}

const ItemDetalle: React.FC<ItemProps> = ({ item }) => {
    return (
        <div>
            <p className="m-8"><Link to={"/"} className="text-[#E2AA11] text-2xl font-bold" > ← Inicio</Link></p>
            <div className='w-[60%] h-[85vh] flex self-center items-center justify-center justify-self-center'>
                <div className='w-[70%] h-[60%] flex flex-col justify-center items-center p-5 shadow-md'>
                    <img src={item.imagen} alt={item.imagen} className="w-[60%] mb-5" />
                    <p className="font-bold text-xl text-left self-start">Descripcion:</p>
                    <p className="detalle-descripcion">{item.descripcion}</p>
                </div>
                <div className="w-[30%] h-[60%] p-5 shadow-md flex flex-col justify-around items-start">
                    <p>{item.cantidadVendida} vendidos</p>
                    <h3 className="detalle-nombre" style={{ fontSize: "25px" }}>{item.instrumento}</h3>
                    <p className="text-[40px] font-light">${item.precio}</p>
                    <div>
                        <p className="text-gray-700 mb-2" style={{ fontSize: "18px" }}>Marca: {item.marca}</p>
                        <p className="text-gray-500" style={{ fontSize: "18px" }}> Modelo: {item.modelo}</p>
                    </div>
                    <p className={`${item.costoEnvio === "G" ? "text-green-600 flex my-2" : "text-[#E2AA11]"}`}>
                        {item.costoEnvio === "G" ? (<><img src={Camion} alt="Icono de camión" /> Envío gratis</>) : <>Costo de envío: ${item.costoEnvio}</>}</p>
                    <button onClick={() => { alert(`${item.instrumento} añadido al carrito`) }} className="py-2 px-5 bg-none border-1 border-[#00000050] text-lg cursor-pointer">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetalle