interface Props {
  label: string
  name: string
  type: string
  placeholder: string
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  value?: string | number
}
export default function ItemForm({
  label,
  name,
  type,
  placeholder,
  handleChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col text-center">
      <label htmlFor={name} className="font-semibold text-lg">
        {label}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          defaultValue={value}
          className="border-1 rounded-md px-2 w-full text-center"
          onChange={handleChange}
        >
          <option value="CUERDA">Cuerda</option>
          <option value="VIENTO">Viento</option>
          <option value="PERCUSION">Percusión</option>
          <option value="TECLADO">Teclado</option>
          <option value="ELECTRONICO">Electrónico</option>
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          id={name}
          value={value === undefined ? undefined : value} // Aquí solo pasas el valor directamente
          className="border-1 rounded-md px-2 w-full text-center"
          onChange={handleChange}
          required
        />
      )}
    </div>
  )
}
