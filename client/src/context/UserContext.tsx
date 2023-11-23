import React, { createContext, useContext, useState } from 'react'
import { User } from '@book-store/server/types/user'

interface Props {
  user: User
}

const UserContext = createContext<ReturnType<typeof useUserHook>>({} as any)

export const useUserContext = () => {
  return useContext(UserContext)
}

const useUserHook = ({ user: _user }: Props) => {
  const [user, setUser] = useState(_user)

  return {
    user,
    setUser,
  }
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') as any)
  const values = useUserHook({ user: user || null })

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
