import React from 'react'
import { Redirect } from 'react-router-dom'
import { useUserContext } from 'src/context/UserContext'

const Home = () => {
  const { user } = useUserContext()

  return (
    <div>
      {!user && <Redirect to="/login" />}
      <h2>Home Page</h2>
    </div>
  )
}

export default Home
