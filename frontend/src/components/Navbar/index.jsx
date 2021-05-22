import React from 'react'
import './Navbar.css'
import { useHistory } from 'react-router'

import { useAuth } from '../../contexts/Auth'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PhotoUser from '../../assets/user.png'

const Navbar = ({ notLogged, setOpenMenu }) => {
    const history = useHistory()
    const { signed } = useAuth()

    const userInfo = JSON.parse(localStorage.getItem('@myuser'))


    return (
        <nav className="navbar">
            {signed && !notLogged ? (
                <div className='login'>
                    <button type='button' className='iconButton' onClick={()=>setOpenMenu(true)}>
                        <FontAwesomeIcon icon={faBars} color='#ffffff' size='2x' />
                    </button>
                    <span className="title">Petlovers</span>
                    <div className="user">
                        <div>
                            <span className="name">{userInfo.nome}</span>
                            <div className="photo">
                                <img src={userInfo.urlFoto ? userInfo.urlFoto : PhotoUser} alt="Avatar do usuario" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='logout'>
                    <span className="title" onClick={() => history.push('/')}>Petlovers</span>
                    <div className="buttons">
                        <button type='button' className='iconButton' onClick={() => history.push('/login')}>
                            <span className="textButton">Login</span>
                        </button>
                        <button type='button' className='iconButton' onClick={() => history.push('/register')}>
                            <span className="textButton">Cadastre-se</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar