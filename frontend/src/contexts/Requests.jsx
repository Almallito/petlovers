import React, { createContext, useContext, useState } from 'react'
import api from '../service/api'

const RequestsContext = createContext({})

export const RequestsProvider = ({ children }) => {
    const [listDogs, setListDogs] = useState([])

    async function register(values){
        api.post('/users/register', values).then(({data})=>{
            return data
        }).catch((err)=>{
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    async function getDogs(){
        api.get('/dogs').then(values => {
            const {data} = values
            setListDogs(data)
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    return (
        <RequestsContext.Provider value={{register, getDogs,listDogs}}>
            {children}
        </RequestsContext.Provider>
    )
}

export const useRequests = () => useContext(RequestsContext)
