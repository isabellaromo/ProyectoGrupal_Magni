import { Link, useNavigate, useParams } from "react-router-dom"

const ApprovedPayment = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    //Redirijimos se se ingreso una url inválida 
    if(!id) navigate('/')

    return (
        <article className="h-full flex justify-center items-center flex-col gap-8 pt-12">
            <h1 className="text-3xl uppercase font-bold">¡Tu pedido fué realizado con éxito!</h1>
            <p className="font-bold uppercase text-3xl text-[#E2AA11]">Tu número de órden es {id}</p>
            <nav className="flex gap-4">
                <Link className="px-3 py-2 rounded-xl shadow-lg text-white bg-[#E2AA11] hover:bg-[#e28e11] font-semibold transition-all" to='/'>Volver al inicio</Link>
                <Link className="px-3 py-2 rounded-xl shadow-lg text-white bg-[#E2AA11] hover:bg-[#e28e11] font-semibold transition-all" to='/#productos'>Ver mas Productos</Link>
            </nav>
        </article>
    )
}

export default ApprovedPayment
