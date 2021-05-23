import React, { createContext, useContext, useState } from 'react'
import api from '../service/api'

const RequestsContext = createContext({})

export const RequestsProvider = ({ children }) => {
    const [listDogs, setListDogs] = useState([])
    const [listBreeds, setListBreeds] = useState([])

    async function register(values) {
        api.post('/users/register', values).then(({ data }) => {
            return data
        }).catch((err) => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    async function getDogs(params = {}) {
        let request = { params: params }
        api.get('/dogs', request).then(values => {
            const { data } = values
            setListDogs(data)
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }
    async function getBreeds() {
        api.get('/breeds').then(values => {
            const { data } = values
            setListBreeds(data)
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    async function uploadFotoPet(file) {
        return api.post('/dogs/photo', file).then(resp => {
            const { data } = resp
            return data.urlFoto
        }).catch((err) => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }
    async function uploadFotoUser(file) {
        return api.post('/users/photo', file).then(resp => {
            const { data } = resp
            return data.urlFoto
        }).catch((err) => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    async function postBreed(values) {
        return api.post('/breeds', values).then(async resp => {
            const { data } = resp
            await getBreeds()
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }
    async function postUser(values) {
        return api.post('/users', values).then(async resp => {
            const { data } = resp
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }
    async function postDog(values) {
        return api.post('/dogs', values).then(async resp => {
            const { data } = resp
            return data
        }).catch(err => {
            alert(`ERRO: ${JSON.stringify(err.response.data)}`)
            return new Error(err)
        })
    }

    return (
        <RequestsContext.Provider value={{ 
            register, 
            getDogs, 
            listDogs, 
            getBreeds, 
            listBreeds, 
            uploadFotoPet,
            postBreed,
            postDog,
            uploadFotoUser,
            postUser}}>
            {children}
        </RequestsContext.Provider>
    )
}

export const useRequests = () => useContext(RequestsContext)
