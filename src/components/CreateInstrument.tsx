import { ChangeEvent, useState } from 'react'
import { Instrumento } from '../types/Instrumento'
import {
  createInstrumentInitialValues,
  formFields,
} from '../constants/instrument.consts'
import fetchHelper from '../helpers/fetchHelper'
import { useModalContext } from '../contexts/ModalContext'
import Form from '../common/Form'
import { validateValues } from '../utils/validateValues'
import { useDataContext } from '../contexts/DataContext'

export default function CreateInstrument() {
  const { reloadTrigger, setReloadTrigger } = useDataContext()
  const { closeModal } = useModalContext()
  const [values, setValues] = useState<Instrumento>(
    createInstrumentInitialValues
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: name === 'costoEnvio' ? value.toString() : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errorMessage = validateValues(values)
    if (errorMessage) {
      setError(errorMessage)
      return
    }
    delete values.id
    try {
      setIsLoading(true)
      await fetchHelper().post(`http://localhost:8080/instrumentos`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setReloadTrigger(!reloadTrigger)
      closeModal()
    } catch (error: unknown) {
      setError(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2
        className="text-xl font-semibold text-[#E2AA11]"
        style={{ fontFamily: 'Poppins' }}
      >
        Agregar Nuevo Instrumento
      </h2>
      <Form
        error={error}
        formFields={formFields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEditing={false}
      />
    </>
  )
}
