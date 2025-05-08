const Button = ({text, width, height, bgColor= "bg-sky-800", hoverColor= "bg-sky-950", handleClick}:{text: string | React.ReactNode; width: string; height: string; bgColor?: string; hoverColor?: string; handleClick?: ()=>void}) => {
  return (
    <button onClick={handleClick} className={`${bgColor} ${width} ${height} flex items-center justify-center text-white rounded-md cursor-pointer hover:bg-${hoverColor}`}>{text}</button>
  )
}

export default Button