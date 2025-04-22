import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Instrumento } from "../types/Instrumento";
import CardDetalle from "../common/ItemDetalle";

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

    if (loading) return <p>Cargando instrumentos...</p>;
  return (
    <>
     <CardDetalle item={item} />
    </>
  );
};

export default Detalle;

