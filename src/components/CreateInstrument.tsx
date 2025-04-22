import { ChangeEvent, useState } from 'react'
import ItemForm from '../common/ItemForm'
import { Instrumento } from '../types/Instrumento'
import {
  createInstrumentInitialValues,
  formFields,
} from '../constants/instrument.consts'
import fetchHelper from '../helpers/fetchHelper'

export default function CreateInstrument() {
  const [values, setValues] = useState<Instrumento>(
    createInstrumentInitialValues
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('VALORES: ', values)
    const response = await fetchHelper().post(
      'http://localhost:8080/instrumentos',
      {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    )
    console.log('RESPUEST: ', response)
  }

  return (
    <>
      <h2
        className="text-xl font-semibold text-[#E2AA11]"
        style={{ fontFamily: 'Poppins' }}
      >
        Agregar Nuevo Instrumento
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center"
      >
        {formFields.map((item, index) => (
          <ItemForm
            key={`Instrument whith index ${index}`}
            label={item.label}
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            handleChange={handleChange}
          />
        ))}
        <button className="bg-[#E2AA11] rounded-md px-3 py-1 text-white font-semibold items-center cursor-pointer hover:bg-[#a78c11]">
          Crear
        </button>
      </form>
    </>
  )
}
