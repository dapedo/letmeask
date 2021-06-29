import copyImg from 'assets/images/copy.svg'

interface RoomCodeTypes {
  code: string
}

function RoomCode({ code }: RoomCodeTypes) {
  function copyCode() {
    navigator.clipboard.writeText(code)
  }

  return (
    <button
      onClick={copyCode}
      className="flex w-auto items-center rounded-xl bg-indigo-50 border-2 border-purple-500 box-content hover:bg-purple-200"
    >
      <div className="flex items-center bg-purple-500 border-purple-500 h-9 rounded-l-md">
        <img src={copyImg} className="mx-2" alt="Copiar código" />
      </div>
      <span className="mx-1 font-semibold">Sala {code}</span>
    </button>
  )
}

export default RoomCode
