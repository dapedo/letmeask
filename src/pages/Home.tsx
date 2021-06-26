import { useHistory } from 'react-router'

import illustration from 'assets/images/illustration.svg'
import logo from 'assets/images/logo.svg'
import googleLogo from 'assets/images/google-icon.svg'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import { useAuth } from 'hooks/useAuth'

function Home() {
  const { signInWithGoogle, user } = useAuth()

  const history = useHistory()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/newroom')
  }

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
        <div className="container flex flex-col m-auto w-72 text-center">
          <img
            src={logo}
            alt="Logo do letmeask"
            className=" w-60 self-center"
          />
          <Button color="red" moreClasses="my-3" onClick={handleCreateRoom}>
            <img src={googleLogo} alt="Logo da google" className="m-3" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <TextInput
              type="text"
              placeholder="Digite o código da sala"
              moreClasses="my-3"
            />
            <Button color="purple" type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
