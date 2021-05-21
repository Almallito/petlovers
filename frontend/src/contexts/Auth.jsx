import React, { createContext, useContext, useState } from 'react'
import api from '../service/api'
import { useHistory } from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [signed, setSigned] = useState(false)
    const history = useHistory()


    const singIn = async (login) => {
        api.post('/auth/singin', { dados: login }).then(resp => {
            const { data: user } = resp
            const { token, ...info } = user
            localStorage.setItem('@myuser', JSON.stringify(info))
            localStorage.setItem('@token', token)
            setSigned(true)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            history.push('/mypets')

        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err)}`)
        })
    }
    const singOut = async () => {
        localStorage.removeItem('@myuser')
        localStorage.removeItem('@token')
        setSigned(false)
        history.push('/')
    }

    return (
        <AuthContext.Provider value={{ singIn, singOut, signed}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
