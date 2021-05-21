import React from 'react'
import './Navbar.css'
import {useHistory} from 'react-router'


import { useAuth } from '../../contexts/Auth'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ title }) => {
    const {signed} = useAuth()
    const history = useHistory()

    return (
        <nav className="navbar">
            {signed ? (
                <div className='login'>
                    <button type='button' className='iconButton'>
                        <FontAwesomeIcon icon={faBars} color='#ffffff' size='lg' />
                    </button>
                    <span className="title">Petlovers</span>
                    <div className="user">
                        <span className="name"></span>
                        <div className="photo">
                            <img src="" alt="" className="" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='logout'>
                    <span className="title">Petlovers</span>
                    <div className="buttons">
                        <button type='button' className='iconButton'>
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