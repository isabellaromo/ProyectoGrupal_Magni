import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Response {
  rol: string
  mensaje?: string
  id: number
  nombreUsuario: string
}

const registerSchema = Yup.object().shape({
  nombreUsuario: Yup.string().required('Requerido'),
  clave: Yup.string().required('Requerido'),
  rol: Yup.string().oneOf(['Admin', 'Operador', 'Visor']).required('Requerido'),
})

const Register = () => {
  const redirect = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: {
    nombreUsuario: string
    clave: string
    rol: string
  }) => {
    console.log(values)
    try {
      const response = await axios.post(
        'http://localhost:8080/api/usuarios/register',
        values
      )

      const data = response.data as Response

      if (response.status === 201) {
        alert(response.data.mensaje)
        delete data.mensaje
        redirect('/login')
      }
      if (response.status !== 200) {
        throw new Error(JSON.stringify(response.data))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error al intentar registrarse. Error: ${error}`)
      }
    }
  }

  return (
    <div className="w-max mx-auto mt-10 p-6 bg-gray-600 rounded-xl shadow-2xl shadow-black/70 self-center place-self-center">
      <h2 className="text-4xl font-semibold mb-4 text-white">Registrarse</h2>

      <div className="flex flex-col items-center gap-3">
        <img
          src="../../public/img/authImage.webp"
          className="max-w-[350px] rounded-2xl"
        />
        <Formik
          initialValues={{ nombreUsuario: '', clave: '', rol: 'Operador' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          <>
            <Form className="flex flex-col gap-2 w-full">
              <Field
                name="nombreUsuario"
                placeholder="Nombre de usuario"
                className="text-white border border-white rounded-2xl outline-0 p-3"
              />
              <ErrorMessage
                name="nombreUsuario"
                component="div"
                className="text-red-500 font-semibold text-center"
              />

              <Field
                name="clave"
                type="password"
                placeholder="Clave"
                className="text-white border border-white rounded-2xl outline-0 p-3"
              />
              <ErrorMessage
                name="clave"
                component="div"
                className="text-red-500 font-semibold text-center"
              />

              <Field
                name="rol"
                as="select"
                className="text-white border border-white rounded-2xl outline-0 p-3"
              >
                <option className="text-black" value="Operador">
                  Operador
                </option>
                <option className="text-black" value="Visor">
                  Visor
                </option>
                <option className="text-black" value="Admin">
                  Admin
                </option>
              </Field>
              <ErrorMessage
                name="rol"
                component="div"
                className="text-red-500 font-semibold text-center"
              />

              <button
                type="submit"
                className="bg-[#E2AA11] px-3 py-2 rounded-2xl text-center text-white hover:bg-[#b6890d] transition-colors cursor-pointer"
              >
                Registrarse
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </Form>
          </>
        </Formik>
        <p className="text-center text-white">
          ¿Ya tienes cuenta?{' '}
          <Link
            to={'/login'}
            className="cursor-pointer underline text-[#E2AA11]"
          >
            Iniciar Sesion
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
