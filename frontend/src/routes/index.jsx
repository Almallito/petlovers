import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'

export default function Routes() {

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/register' exact component={Cadastro} />
                <PrivateRoute>
                    {/* <Route path={`/home`} exact component={Home} /> */}
                </PrivateRoute>
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
    )
}