import { Link } from 'react-router-dom'

import illustration from 'assets/images/illustration.svg'
import logo from 'assets/images/logo.svg'
import Button from 'components/Button'
import TextInput from 'components/TextInput'

function NewRoom() {
  return (
    <div className="flex flex-row h-screen w-screen">
      <aside className=" box-border flex-col items-start justify-center flex-1 hidden lg:flex bg-purple-500 text-white py-32 pl-48">
        <img
          src={illustration}
          alt="Ilustração simbolizando troca de mensagens"
          className="w-96"
        />
        <strong className="text-3xl">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="text-xl">
          Tire as duvidas da sua audiência em tempo-real
        </p>
      </aside>
      <main className="flex items-center flex-1 bg-indigo-50">
        <div className="flex flex-col m-auto w-84 text-center">
          <img src={logo} alt="Logo do letmeask" className="w-64 self-center" />
          <h1 className="text-3xl font-bold my-4">Crie uma nova sala</h1>
          <form action="">
            <TextInput
              type="text"
              placeholder="Nome da sala"
              moreClasses="my-3"
            />
            <Button color="purple" type="submit">
              Criar sala
            </Button>
            <p className="text-gray-500 text-base my-3">
              Quer entrar em uma sala existente?&nbsp;
              <Link className=" text-pink-600 hover:underline" to="/">
                Clique aqui
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
