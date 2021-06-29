import { ReactNode } from 'react'

type QuestionCardTypes = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children: ReactNode
}

function QuestionCard({ content, children, author }: QuestionCardTypes) {
  return (
    <div className="shadow bg-white rounded-lg p-5 mb-5">
      <p>{content}</p>
      <footer className="flex justify-between items-center">
        <div className="flex items-center mt-4">
          <img
            src={author.avatar}
            className="rounded-full h-14"
            alt={author.name}
          />
          <span className="text-gray-700 ml-2">{author.name}</span>
        </div>
        <div className="mt-auto">{children}</div>
      </footer>
    </div>
  )
}

export default QuestionCard
