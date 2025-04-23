import ItemForm from './ItemForm'

type Props = {
  handleSubmit: (e: React.FormEvent) => void
  formFields: {
    label: string
    name: string
    placeholder: string
    type: string
    value?: string | number
  }[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  error: string | null
  isEditing: boolean
}

const Form = ({
  handleSubmit,
  formFields,
  handleChange,
  isLoading,
  error,
  isEditing,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 justify-center"
    >
      {formFields.map((item, index) => (
        <ItemForm
          key={`Instrument field ${index}`}
          label={item.label}
          name={item.name}
          placeholder={item.placeholder}
          type={item.type}
          handleChange={handleChange}
          value={item.value ? item.value : undefined}
        />
      ))}

      <button className="bg-[#E2AA11] rounded-md px-3 py-1 text-white font-semibold items-center cursor-pointer hover:bg-[#a78c11]">
        {isEditing
          ? isLoading
            ? 'Cargando'
            : 'Editar'
          : isLoading
          ? 'Creando'
          : 'Crear'}
      </button>
      {error && (
        <p className="flex gap-1">
          <span className="text-red-500">{error}.</span>
          <span>Por favor, vuelva a intentar</span>
        </p>
      )}
    </form>
  )
}

export default Form
