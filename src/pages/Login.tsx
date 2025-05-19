import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { authStore } from '../contexts/authStore'

const loginSchema = Yup.object().shape({
  nombreUsuario: Yup.string().required('Requerido'),
  clave: Yup.string().required('Requerido'),
})

const Login = () => {
  const login = authStore(state => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (values: {
    nombreUsuario: string
    clave: string
  }) => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Credenciales incorrectas')
      }

      const data = await response.json()
      console.info('USER: ', data)
      login(data)
      navigate('/') // redirige al home u otra ruta protegida
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <article className=" w-max mx-auto mt-10 p-6 bg-gray-600 rounded-xl shadow-2xl shadow-black/70 self-center place-self-center">
      <h2 className="text-4xl font-semibold mb-4 text-white text-center">
        Iniciar Sesión
      </h2>
      <div className="flex flex-col items-center gap-3">
        <img
          src="../../public/img/authImage.webp"
          className="max-w-[400px] rounded-2xl"
        />
        <Formik
          initialValues={{ nombreUsuario: '', clave: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2 w-full">
            <Field
              name="nombreUsuario"
              placeholder="Nombre de usuario"
              className="text-white border border-white rounded-2xl outline-0 p-3 w-full"
            />
            <ErrorMessage
              name="nombreUsuario"
              component="div"
              className="text-red-500 text-sm mb-3 text-center font-semibold"
            />

            <Field
              name="clave"
              type="password"
              placeholder="Clave"
              className="text-white border border-white rounded-2xl outline-0 p-3 w-full"
            />
            <ErrorMessage
              name="clave"
              component="div"
              className="text-red-500 text-sm mb-3 text-center font-semibold"
            />

            <button
              type="submit"
              className="bg-[#E2AA11] px-3 py-2 rounded-2xl text-center text-white font-semibold hover:bg-[#b6890d] transition-colors cursor-pointer"
            >
              Ingresar
            </button>
          </Form>
        </Formik>
        <p className="text-center text-white">
          ¿No tienes cuenta?{' '}
          <Link
            to={'/register'}
            className="cursor-pointer underline text-[#E2AA11]"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </article>
  )
}

export default Login
