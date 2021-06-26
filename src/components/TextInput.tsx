import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  moreClasses?: string
}

function TextInput({ moreClasses, ...rest }: InputProps) {
  return (
    <input
      type="text"
      className={`shadow appearance-none px-3 h-14 w-full border-gray-400 border-2 rounded-lg ${moreClasses}`}
      {...rest}
    />
  )
}

export default TextInput
