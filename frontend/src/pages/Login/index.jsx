import React, {useEffect} from 'react'
import './Login.css'

import Navbar from '../../components/Navbar'
import { Formik, Form } from 'formik'
import Input from '../../components/Input'
import * as yup from 'yup'
import { useAuth } from '../../contexts/Auth'
import { useHistory } from 'react-router-dom'


const Login = () => {

    const {singIn} = useAuth()
    const history = useHistory()

    useEffect(()=>{
        const token = localStorage.getItem('@token')
        if(token){
            history.push('mypets')
        }
    },[history])

    let initialValues = {
        nome: '',
        email: ''
    }

    const validations = yup.object().shape({
        email: yup.string().email('Digite um email valido').required('Email necessario'),
        senha: yup.string().required('Senha necessaria')
    })

    async function handleSubmit(values){
        singIn(values).then(values=> {
            if(values)history.push('/mypets')
        })
    }

    return (
        <>
            <Navbar notLogged/>
            <div className="contentLogin">
                <div className="blurLogin">
                    <div className="container login">
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={validations}
                            validateOnBlur>
                            <Form className='formulario'>
                                <span className="subtitle">Faça seu login</span>
                                <Input name='email' placeHolder='Email' noLabel />
                                <Input name='senha' placeHolder='Senha' noLabel password />
                                <button type='submit' className='buttonSend'>
                                    <span>Entrar</span>
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login