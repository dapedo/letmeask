import { ReactNode, useState, useEffect } from 'react'
import { createContext } from 'react'
import { auth, firebase } from 'services/firebase'

interface UserInfo {
  id: string
  name: string
  avatar: string
}

interface AuthContextTypes {
  user: UserInfo | undefined
  signInWithGoogle: () => Promise<void>
}

interface AuthTypes {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextTypes)

export function AuthContextProvider({ children }: AuthTypes) {
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      const res = await auth.signInWithPopup(provider)
      if (res.user) {
        const { displayName, photoURL, uid } = res.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
