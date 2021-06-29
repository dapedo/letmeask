import { useEffect, useState } from 'react'
import { database } from 'services/firebase'
import { useAuth } from './useAuth'

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

function useRoom(id: string) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on('value', (room) => {
      const roomValues = room.val()
      const databaseQuestions: FirebaseQuestions = roomValues.questions ?? {}

      const parsedQuestions = Object.entries(databaseQuestions ?? {}).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id
          )?.[0],
        })
      )

      setTitle(roomValues.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [id, user?.id])

  return { title, questions }
}

export default useRoom
