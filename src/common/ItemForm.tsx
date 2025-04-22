interface Props {
  label: string
  name: string
  type: string
  placeholder: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function ItemForm({
  label,
  name,
  type,
  placeholder,
  handleChange,
}: Props) {
  return (
    <div className="flex flex-col text-center">
      <label htmlFor="name" className="font-semibold text-lg">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        className="border-1 rounded-md px-2 w-full text-center"
        onChange={handleChange}
        required
      />
    </div>
  )
}
