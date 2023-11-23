import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { authRoutes } from 'src/routes/Routing'

const Router: React.FC<any> = () => {
  return (
    <Switch>
      {authRoutes.map((route, i) => (
        <Route key={i} path={route.path} component={route.component} />
      ))}
    </Switch>
  )
}

export default Router
