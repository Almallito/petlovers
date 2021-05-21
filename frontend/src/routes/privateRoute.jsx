import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../contexts/Auth'


const PrivateRoute = ({ children, ...rest }) => {
    const { signed } = useAuth()

    return signed ? <Route {...rest}>{children}</Route> : <Redirect to='/'/>

}

export default PrivateRoute