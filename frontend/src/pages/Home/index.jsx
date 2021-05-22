import React from 'react'
import './Home.css'

import Navbar from '../../components/Navbar'

import {useHistory} from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    return (
        <>
            <Navbar notLogged/>
            <div className="contentHome">
                <div className="blur">
                    <div className="intro">
                        <h1>Tá sozinho?</h1>
                        <h2>Adote um doguinho!</h2>
                        <p>A petlovers te ajuda a encontrar o seu novo <br />
                        amiguinho. Basta clicar no botão abaixo!</p>
                        <button type='button' className='searchButton' onClick={() => history.push('/searchPets')}>
                            <span>Procurar doguineos</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home