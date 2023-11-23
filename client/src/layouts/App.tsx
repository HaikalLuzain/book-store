import React, { useEffect, useState } from 'react'
import { UserContextProvider, useUserContext } from 'src/context/UserContext'
import { Api } from 'src/config/Api'
import mainRoute from 'src/routes'
import PrivateRoute from 'src/routes/PrivateRoute'
import Router from 'src/config/Routes'

const App = () => {
  const { user } = useUserContext()
  const [auth, setAuth] = useState(user)

  useEffect(() => {
    const getLogin = async () => {
      try {
        await Api().get('/auth/define')
      } catch (error) {
        setAuth(null)
        localStorage.clear()
      }
    }

    getLogin()
  }, [])

  return (
    <UserContextProvider user={auth}>
      <Router />
      <PrivateRoute path={mainRoute.path} component={mainRoute.component} />
    </UserContextProvider>
  )
}

export default App
