import logo from 'assets/images/logo.svg'
import EmptyQuestions from 'assets/images/empty-questions.svg'
import Button from 'components/Button'
import RoomCode from 'components/RoomCode'
import { useAuth } from 'hooks/useAuth'
import { useHistory, useParams } from 'react-router-dom'
import QuestionCard from 'components/QuestionCard'
import useRoom from 'hooks/useRoom'
import { database } from 'services/firebase'

interface RoomParams {
  id: string
}

export function AdminRoom() {
  const { id } = useParams<RoomParams>()
  const { user } = useAuth()
  const { questions, title } = useRoom(id)
  const history = useHistory()

  async function handleDelete(questionId: string) {
    try {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    } catch (error) {
      alert('Houve um erro ao deletar a pergunta')
    }
  }

  async function handleEndRoom() {
    try {
      if (window.confirm('Tem certeza que deseja encerrar a sala?')) {
        await database.ref(`rooms/${id}`).update({
          endAt: new Date(),
        })
        history.push('/')
      }
    } catch (error) {
      alert('Houve um erro ao encerrar a sala')
    }
  }

  return (
    <div className="w-screen h-full min-h-screen bg-indigo-50 ">
      <header className=" p-4 border-b border-gray-500 border-opacity-50 md:px-32  ">
        <div className="container flex justify-between items-center m-auto">
          <img src={logo} alt="Logo do letmeask" className="h-16" />
          <div className="flex w-96">
            <RoomCode code="#12345" />
            <Button
              onClick={handleEndRoom}
              color="purple"
              isOutlined
              moreClasses="w-32 h-auto ml-8 "
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main className="container  m-auto px-4 pb-4 max-w-7xl sm:px-32 ">
        <div className="flex w-full my-4 justify-between items-center">
          <h1 className="text-2xl font-semibold">Sala {title}</h1>
          {questions?.length > 0 && (
            <span className="bg-pink-500 text-white mx-4 p-2 px-3 rounded-full ">
              {questions.length} perguntas
            </span>
          )}
        </div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              content={question.content}
              author={question.author}
              key={question.id}
            >
              <button onClick={() => handleDelete(question.id)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 5.99988H5H21"
                    stroke="#737380"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                    stroke="#737380"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </QuestionCard>
          ))
        ) : (
          <div className="h-full w-full text-center my-8">
            <img
              src={EmptyQuestions}
              className=" m-auto"
              alt="Imagem indicando que não há questões"
            />
            <h2 className="text-2xl font-medium">Nenhuma pergunta por aqui</h2>
            <p>
              {user
                ? `Seja a primeira pessoa a fazer uma pergunta`
                : `Faça seu login e seja a primeira pessoa a fazer uma pergunta`}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
export default AdminRoom
