import React, { useEffect, useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { signed, loading, verifyToken } = useAuth()
    const history = useHistory()
    useEffect(()=>{
        verifyToken().then(resp=>{
            if(resp) {
                history.push(rest.path)
            } else {
                history.push('/')
            }
        })
    },[signed === false])

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