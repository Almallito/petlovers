import React, { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { signed, verifyToken } = useAuth()
  const history = useHistory()
  useEffect(() => {
      verifyToken().then(resp => {
        if (resp) {
          history.push(rest.path)
        } else {
          history.push('/login')
        }
      })
  }, [signed,history, verifyToken, rest.path])

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <Component {...props} />
        ) : (
          <Redirect to={props.location} />
        )
      }
    />
  )
}

export default PrivateRoute