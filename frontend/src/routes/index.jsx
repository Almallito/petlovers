import React from 'react'
// import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './privateRoute'

import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import MeusPets from '../pages/MeusPets'
import PesquisaPets from '../pages/PesquisaPets'
import CadastroPets from '../pages/CadastroPets'

export default function Routes() {


    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/register' exact component={Cadastro} />
                <Route path='/login' exact component={Login} />
                <Route path='/searchpets' exact component={PesquisaPets} />
                <PrivateRoute exact path="/mypets" component={MeusPets} />
                <PrivateRoute exact path="/registerpets" component={CadastroPets} />
                <Redirect to='/'/>
            </Switch>
        </Router>
    )
}