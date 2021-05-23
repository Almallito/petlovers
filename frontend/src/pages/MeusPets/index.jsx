import React, {useState, useEffect} from 'react'
import './MeusPets.css'

import Navbar from '../../components/Navbar'
import Menu from '../../components/Menu'
import Card from '../../components/Card'

import {useRequests} from '../../contexts/Requests'

const MeusPets = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const {getDogs,listDogs} = useRequests()
    const user = JSON.stringify(localStorage.getItem('@myuser'))

    useEffect(()=> {
        getDogs({userId: user.id})
    },[])

    return (
        <>
            <Navbar setOpenMenu={setMenuOpen}/>
            <Menu opened={menuOpen} setOpened={setMenuOpen}/>
            <div className="backgroundContent">
                <div className='conteudo'>
                    <span className="titleBody">Meus pets cadastrados</span>
                    <div className="cards">
                        {listDogs.length > 0 && listDogs.map((d,i) => {
                            return (
                                <Card values={d} key={`${i}mydog`}/>
                            )
                        })}
                        {listDogs.length < 1 && (
                            <span className="msg">Nenhum pet cadastrado</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeusPets