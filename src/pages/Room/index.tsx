import logo from 'assets/images/logo.svg'
import EmptyQuestions from 'assets/images/empty-questions.svg'
import Button from 'components/Button'
import RoomCode from 'components/RoomCode'
import { useAuth } from 'hooks/useAuth'
import { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { database } from 'services/firebase'
import QuestionCard from 'components/QuestionCard'
import useRoom from 'hooks/useRoom'

interface RoomParams {
  id: string
}

export function Room() {
  const { id } = useParams<RoomParams>()
  const { user } = useAuth()
  const { questions, title } = useRoom(id)
  const history = useHistory()
  const [newQuestion, setNewQuestion] = useState('')

  async function sendQuestion(e: FormEvent) {
    e.preventDefault()
    if (newQuestion.trim() === '') {
      alert('Por favor digite uma pergunta válida.')
      return
    }

    if (!user) {
      alert('Você deve estar logado para mandar uma pergunta.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    try {
      await database.ref(`rooms/${id}/questions`).push(question)
      setNewQuestion('')
    } catch (error) {
      alert('Houve um erro ao enviar a pergunta, tente novamente.')
      console.log(error)
    }
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    try {
      if (likeId) {
        await database
          .ref(`rooms/${id}/questions/${questionId}/likes/${likeId}`)
          .remove()
      } else {
        await database.ref(`rooms/${id}/questions/${questionId}/likes`).push({
          authorId: user?.id,
        })
      }
    } catch (error) {
      alert('Houve um erro ao dar ou retirar o like, tente novamente')
    }
  }

  const goToLogin = () => history.push('/')

  return (
    <div className="w-screen h-full min-h-screen bg-indigo-50 ">
      <header className=" p-4 border-b border-gray-500 border-opacity-50 md:px-32  ">
        <div className="container flex justify-between items-center m-auto">
          <img src={logo} alt="Logo do letmeask" className="h-16" />
          <RoomCode code="#12345" />
        </div>
      </header>
      <main className="container  m-auto px-4 pb-4 max-w-7xl sm:px-32 ">
        <div className="flex w-full my-4 items-center ">
          <h1 className="text-2xl font-semibold">Sala {title}</h1>
          {questions?.length > 0 && (
            <span className="bg-pink-500 text-white mx-4 p-2 px-3 rounded-full ">
              {questions.length} perguntas
            </span>
          )}
        </div>
        <form onSubmit={sendQuestion}>
          <textarea
            name="question"
            cols={30}
            rows={4}
            placeholder="O que você quer perguntar?"
            className="w-full rounded-lg p-4"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <div className="flex flex-col my-3 md:flex-row md:justify-between">
            {user ? (
              <div className="flex items-center mb-3">
                <img
                  src={user.avatar}
                  className="rounded-full w-auto h-14"
                  alt="Minha foto"
                />
                <span className="ml-2">{user.name}</span>
              </div>
            ) : (
              <p className="text-gray-800 self-center mb-3">
                Para enviar uma pergunta,{' '}
                <button
                  className="underline text-purple-500"
                  onClick={goToLogin}
                >
                  faça seu login
                </button>
                .
              </p>
            )}
            <Button
              color="purple"
              moreClasses="md:w-auto md:px-8"
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>

        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              content={question.content}
              author={question.author}
              key={question.id}
            >
              <button
                onClick={() => handleLikeQuestion(question.id, question.likeId)}
                className="flex items-end justify-end"
              >
                {question.likeCount > 0 && <span>{question.likeCount}</span>}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                    stroke={question.likeId ? '#8B5CF6' : '#737380'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
export default Room
