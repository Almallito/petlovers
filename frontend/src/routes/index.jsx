import React from 'react'
// import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'

import PrivateRoute from './privateRoute'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import MeusPets from '../pages/MeusPets'

export default function Routes() {

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/register' exact component={Cadastro} />
                <Route path='/login' exact component={Login} />
                <PrivateRoute exact path="/mypets" component={MeusPets} />
                {/* <Route path='*'>
                    <Redirect to='/' />
                </Route> */}
            </Switch>
        </Router>
    )
}