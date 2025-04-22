const Button = ({text, width, height}:{text: string; width: string; height: string;}) => {
  return (
    <button className={`min-w-[100px] bg-sky-800 text-white rounded-md cursor-pointer hover:bg-sky-950 ${width} ${height}`}>{text}</button>
  )
}

export default Button