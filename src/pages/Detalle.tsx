import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Instrumento } from "../types/Instrumento";
import { CartContext } from "../contexts/CartContext";
import Camion from "/img/camion.png"
import Swal from "sweetalert2";

const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Instrumento>({} as Instrumento);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`http://localhost:8080/instrumentos/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Error al obtener los instrumentos');
          return res.json();
        })
        .then((data) => {
          setItem(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, []);
  const {addCarrito} = useContext(CartContext)
    if (loading) return <p>Cargando instrumentos...</p>;
  return (
    <div className="w-[100%] flex justify-center">
    <p className="m-8"><Link to={"/"} className="text-[#E2AA11] text-2xl font-bold" > ← Inicio</Link></p>
    <button className="p-6 bg-[#E2AA11] h-3 flex items-center rounded-3xl text-white font-bold text-xl self-end cursor-pointer hover:bg-gray-700 m-4">Exportar en PDF</button>
    <div className='w-[60%] h-[95vh] flex self-center items-center justify-center justify-self-center'>
        <div className='w-[70%] h-[60%] flex flex-col justify-center items-center p-12 shadow-md'>
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
            <p className={`${item.costoEnvio === "G" ? "text-green-600 flex my-2 w-[300px]" : "text-[#E2AA11]"}`}>
                {item.costoEnvio === "G" ? (<><img src={Camion} alt="Icono de camión" /> Envío gratis</>) : <>Costo de envío: ${item.costoEnvio}</>}</p>
            <button
            onClick={() => {addCarrito(item); Swal.fire("", "Producto añadido correctamente", "success")}}
            className="py-2 px-5 bg-none border-1 border-[#00000050] text-lg cursor-pointer hover:bg-gray-300 rounded-2xl"
            >Añadir al Carrito</button>
        </div>
    </div>
</div>
  );
};

export default Detalle;

