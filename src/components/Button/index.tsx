import { ButtonHTMLAttributes } from 'react'
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  moreClasses?: string
  isOutlined?: boolean
}

function Button({ moreClasses, isOutlined, color, ...rest }: ButtonProps) {
  const outlined = `border-2 border-${color}-500 text-black hover:bg-${color}-200`
  const notOutlined = `bg-${color}-500 text-white hover:bg-${color}-600`

  return (
    <button
      className={`shadow btn text-left font-semibold ${
        isOutlined ? outlined : notOutlined
      } ${moreClasses} `}
      {...rest}
    />
  )
}

export default Button
