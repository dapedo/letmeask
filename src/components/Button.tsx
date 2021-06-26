import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  moreClasses?: string
}

function Button({ moreClasses, color, ...rest }: ButtonProps) {
  return (
    <button
      className={`shadow btn bg-${color}-500 hover:bg-${color}-600 text-left font-bold ${moreClasses}`}
      {...rest}
    />
  )
}

export default Button
