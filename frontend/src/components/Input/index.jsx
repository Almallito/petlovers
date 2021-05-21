import React, { useState, useEffect } from 'react'
import { Field, ErrorMessage } from 'formik'
import './Input.css'
import { Eye, EyeOff } from 'react-feather'



const Input = (props) => {
    const { label, 
            placeHolder, 
            name, 
            password, 
            noLabel
        } = props

    const [showText, setShowText] = useState(false)

    useEffect(() => {
        if (password) {
            setShowText(false)
        } else {
            setShowText(true)
        }
    }, [password])


    return (
        <div className='columnInput'>
            {!noLabel && <label className='label' htmlFor={`input${name}`}>{label}</label>}
            <div className="input">
                <Field id={`input${name}`} placeholder={placeHolder} name={name} type={showText ? 'text' : 'password'} />
                {password && (<button type='button' onClick={() => setShowText(!showText)}>{showText ? <EyeOff /> : <Eye />}</button>)}
            </div>
            <ErrorMessage component='span' name={name} className='erroMsg' />
        </div>
    )
}

export default Input
