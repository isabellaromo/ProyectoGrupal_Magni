import { ChangeEvent, useState } from 'react'
import Form from '../common/Form'
import { Instrumento } from '../types/Instrumento'
import { useModalContext } from '../contexts/ModalContext'
import fetchHelper from '../helpers/fetchHelper'
import { createFormFields } from '../utils/createFormFields'
import { validateValues } from '../utils/validateValues'
import { useDataContext } from '../contexts/DataContext'

const EditInstrument = ({ instrument }: { instrument: Instrumento }) => {
  const { reloadTrigger, setReloadTrigger } = useDataContext()
  const { closeModal } = useModalContext()
  const [values, setValues] = useState<Instrumento>({
    ...instrument,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.name === 'costoEnvio'
          ? e.target.value.toString()
          : e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errorMessage = validateValues(values)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    try {
      setIsLoading(true)
      await fetchHelper().put(
        `http://localhost:8080/instrumentos/${values.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      )
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
        className="text-xl font-semibold text-[#E2AA11] flex flex-col"
        style={{ fontFamily: 'Poppins' }}
      >
        <span>Editar el instrumento</span>
        <span>{instrument.instrumento}</span>
      </h2>
      <Form
        error={error}
        formFields={createFormFields(values)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEditing={true}
      />
    </>
  )
}

export default EditInstrument
