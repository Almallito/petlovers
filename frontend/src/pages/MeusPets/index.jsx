import React, {useState, useEffect} from 'react'
import './MeusPets.css'

import Navbar from '../../components/Navbar'
import Menu from '../../components/Menu'
import Card from '../../components/Card'

import {useRequests} from '../../contexts/Requests'

const MeusPets = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const {getDogs,listDogs} = useRequests()

    useEffect(()=> {
        getDogs()
    },[])

    return (
        <>
            <Navbar setOpenMenu={setMenuOpen}/>
            <Menu opened={menuOpen} setOpened={setMenuOpen}/>
            <div className="backgroundContent">
                <div className='conteudo'>
                    <span className="titleBody">Meus pets cadastrados</span>
                    <div className="cards">
                        {listDogs.map((d,i) => {
                            return (
                                <Card values={d} key={`${i}mydog`}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeusPets