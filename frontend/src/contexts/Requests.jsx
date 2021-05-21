import React, { createContext, useContext, useState } from 'react'
import api from '../service/api'
import { useHistory } from "react-router-dom";

const RequestsContext = createContext({})

export const RequestsProvider = ({ children }) => {
    const history = useHistory()
    async function register(values){
        api.post('/users/register', values).then(({data})=>{
            return data
        }).catch((err)=>{
            alert(err)
            return new Error(err)
        })
    }

    return (
        <RequestsContext.Provider value={{register}}>
            {children}
        </RequestsContext.Provider>
    )
}

export const useRequests = () => useContext(RequestsContext)
