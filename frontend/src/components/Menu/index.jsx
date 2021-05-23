import React from 'react'
import './Menu.css'
import PhotoUser from '../../assets/user.png'
import {useAuth} from '../../contexts/Auth'
import {useHistory} from 'react-router-dom'

const Menu = ({opened, setOpened}) => {
    const userInfo = JSON.parse(localStorage.getItem('@myuser')) || {}
    const {singOut} = useAuth()
    const history = useHistory(

    )
    return (
        <div id='backdrop' className={opened ? 'backdrop opened' : 'backdrop'} onClick={event => {
            if(event.target.id === 'backdrop'){
                setOpened(false)
            }
        }}>
            <div className={opened ? "menu opened" : "menu"}>
                <div className="userInfo">
                    <div className="photo">
                        <img src={userInfo.urlFoto ? userInfo.urlFoto : PhotoUser} alt="Avatar do usuario" />
                    </div>
                    <span className="name">{userInfo.nome}</span>
                </div>
                <div className="buttons">
                    <ul>
                        <li>
                            <span onClick={()=>history.push('/searchpets')}>Procurar pets</span>
                        </li>
                        <li>
                            <span onClick={()=>history.push('/registerpets')}>Cadastrar pets</span>
                        </li>
                        <li>
                            <span onClick={()=>history.push('/mypets')}>Meus pets</span>
                        </li>
                        <li>
                            <span onClick={()=>history.push('/config')}>Configurações</span>
                        </li>
                        <li>
                            <span onClick={()=>{
                                history.push('/')
                                singOut()
                            }}>Sair</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu