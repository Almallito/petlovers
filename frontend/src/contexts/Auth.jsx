import React, { createContext, useContext, useState } from 'react'
import api from '../service/api'
import { useHistory } from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    const singIn = async (values) => {
        const user = await api.post('/users/auth', values).then(async resp => {
            const { data: user } = resp
            const { token, ...info } = user
            localStorage.setItem('@myuser', JSON.stringify(info))
            localStorage.setItem('@token', token)
            await setSigned(true)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return user

        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return
        })
        return user
    }
    async function singOut() {
        localStorage.removeItem('@myuser')
        localStorage.removeItem('@token')
        setSigned(false)
    }

    async function verifyToken() {
        const token = localStorage.getItem('@token')
        if (!token) {
            localStorage.removeItem('@myuser')
            await setSigned(false)
            return false;
        }

        return new Promise(async (resolve, reject) => {
            const resp = await api.post('/users/validToken', { token: token })
            if (resp.data.token) {
                await setSigned(true)
                resolve(true);

            } else {
                localStorage.removeItem('@token')
                localStorage.removeItem('@myuser')
                alert(`Token Expirou`)
                await setSigned(false)
                resolve(false);
            }
        })
    }

    return (
        <AuthContext.Provider value={{ singIn, singOut, signed, verifyToken, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
