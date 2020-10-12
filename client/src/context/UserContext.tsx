import React, { createContext, useContext, useEffect, useState } from 'react'
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

export const UserContextProvider: React.FC<Props> = ({ user, children }) => {
  const values = useUserHook({ user })

  useEffect(() => {
    values.setUser(user)
  }, [values, user])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}
