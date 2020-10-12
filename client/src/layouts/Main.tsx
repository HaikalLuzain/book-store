import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Header from 'src/components/header/header'
import Sidebar from 'src/components/sidebar/Sidebar'
import Footer from 'src/components/footer/Footer'
import { dashboardRoutes } from 'src/routes/Routing'

const Fulllayout = (props) => {
  const history = useHistory()
  /*--------------------------------------------------------------------------------*/
  /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
  /*--------------------------------------------------------------------------------*/
  const [width, setWidth] = useState(window.innerWidth)

  history.listen((location: any, action: any) => {
    if (
      window.innerWidth < 767 &&
      document
        .getElementById('main-wrapper')
        .className.indexOf('show-sidebar') !== -1
    ) {
      document.getElementById('main-wrapper').classList.toggle('show-sidebar')
    }
  })

  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  useEffect(() => {
    const updateDimensions = () => {
      let element = document.getElementById('main-wrapper')
      setWidth(window.innerWidth)
      if (element) {
        if (width < 1170) {
          element.setAttribute('data-sidebartype', 'mini-sidebar')
          element.classList.add('mini-sidebar')
        } else {
          element.setAttribute('data-sidebartype', 'full')
          element.classList.remove('mini-sidebar')
        }
      }
    }
    if (document.readyState === 'complete') {
      updateDimensions()
    }
    window.addEventListener('resize', updateDimensions.bind(this))
    window.addEventListener('load', updateDimensions.bind(this))
    return () => {
      window.removeEventListener('load', updateDimensions.bind(this))
      window.removeEventListener('resize', updateDimensions.bind(this))
    }
  }, [width, props])

  /*--------------------------------------------------------------------------------*/
  /* Theme Setting && Layout Options wiil be Change From Here                       */
  /*--------------------------------------------------------------------------------*/
  return (
    <div
      id="main-wrapper"
      data-theme="light"
      data-layout="vertical"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <Sidebar {...props} routes={dashboardRoutes} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <h2 className="section-title">Advanced Forms</h2>
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />
              } else {
                return (
                  <Route
                    exact={prop.exact || false}
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
            })}
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default Fulllayout
