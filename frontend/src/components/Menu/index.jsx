import React from 'react'
import './Menu.css'
import PhotoUser from '../../assets/user.png'
import {useAuth} from '../../contexts/Auth'

const Menu = ({opened, setOpened}) => {
    const userInfo = JSON.parse(localStorage.getItem('@myuser'))
    const {singOut} = useAuth()
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
                            <a>Procurar pets</a>
                        </li>
                        <li>
                            <a>Cadastrar pets</a>
                        </li>
                        <li>
                            <a>Meus pets</a>
                        </li>
                        <li>
                            <a>Configurações</a>
                        </li>
                        <li>
                            <a onClick={()=>singOut()}>Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu