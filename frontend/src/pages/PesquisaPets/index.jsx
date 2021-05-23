import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useRequests } from '../../contexts/Requests'
import { useAuth } from '../../contexts/Auth'

import './PesquisaPets.css'

import Card from '../../components/Card'
import Menu from '../../components/Menu'
import Navbar from '../../components/Navbar'

const PesquisaPets = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { getBreeds, listBreeds, listDogs, getDogs } = useRequests()
    const { verifyToken } = useAuth()

    useEffect(() => {
        verifyToken()
        getDogs()
        getBreeds()
    }, [])

    function handleSubmit(values){
        const params = {}
        if(values.breedId !== '') params.breedId = values.breedId
        if(values.verm) params.vermifugado = values.verm
        if(values.cast) params.castrado = values.cast
        getDogs(params)
    }

    return (
        <>
            <Navbar setOpenMenu={setMenuOpen} />
            <Menu opened={menuOpen} setOpened={setMenuOpen} />
            <div className="contentSearch">
                <div className="filters">
                    <span className="titleFilter">Filtros:</span>
                    <Formik initialValues={{
                        verm: false,
                        cast: false,
                        breedId: ''
                    }}
                    onSubmit={handleSubmit}>
                        <Form className='formSearch'>
                            <div>
                                <div className="selectInput">
                                    <Field as='select' name='breedId'>
                                        <option value="">Raça</option>
                                        {listBreeds.map((raca, i) => {
                                            return <option key={`${i}breed`} value={raca.id}>{raca.nome}</option>
                                        })}
                                    </Field>
                                </div>
                                <div className="check">
                                    <Field type="checkbox" name="verm" />
                                    <label htmlFor="verm">Vermifugado</label>
                                </div>
                                <div className="check">
                                    <Field type="checkbox" name="cast" />
                                    <label htmlFor="cast">Castrado</label>
                                </div>
                            </div>
                            <button type='submit' className='filterButton'>
                                <span>Pesquisar</span>
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="cardsSearch">
                    {listDogs.length > 0 && listDogs.map((d, i) => {
                        return (
                            <Card values={d} key={`${i}mydog`} />
                        )
                    })}
                    {listDogs.length < 1 && (
                        <span className="msg">Nenhum pet para adoção</span>
                    )}
                </div>
            </div>
        </>
    )
}

export default PesquisaPets