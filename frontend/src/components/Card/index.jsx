import React from 'react'
import './Card.css'
import NotImage from '../../assets/notImage.png'

const Card = ({ values }) => {
    return (
        <div className="card">
            <div className="photoAnim">
                <img src={values.urlFoto ? values.urlFoto : NotImage} alt={`Foto do ${values.nome}`} />
                <div className="blurName">
                    <span className="nameDog">{values.nome}</span>
                </div>
            </div>
            <div className="desc">
                <span className="raca">{values.breed.nome}</span>
                <span className="idade">{values.idade} meses</span>
                {values.vermifugado && <span className="comp">Vermifugado</span>}
                {values.castrado && <span className="comp">Castrado</span>}
            </div>
        </div>
    )
}

export default Card