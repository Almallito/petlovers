import React from 'react'
import { Formik, Form } from 'formik'
import Input from '../../components/Input'
import './Cadastro.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useHistory} from 'react-router'
import * as yup from 'yup'
import {useRequests} from '../../contexts/Requests'

const Cadastro = () => {
    const history = useHistory()
    const {register} = useRequests()
    const initialValues = {
        nome: '',
        email: '',
        senha: '',
        validation: ''
    }

    const validations = yup.object().shape({
        nome: yup.string().required('Nome necessario'),
        email: yup.string().email('Digite um email valido').required('Email necessario'),
        senha: yup.string().min(4, 'Pelomenos 4 caracteres').required('Senha necessaria'),
        validation: yup.string().oneOf([yup.ref('senha'), null], 'Senhas não conferem')
    })

    function handleSubmit(values){
        const {validation, ...dados} = values
        register(dados).then(()=> {
            history.push('/')
        }).catch(err => {
            alert('Ocorreu um erro ao realizar cadastro')
        })
    }

    return (
        <div className="contentCadastro">
            <div className="backgroundImage"></div>
            <div className="form">
                <button type='button' className='buttonIcon' onClick={()=> history.push('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} color='#ffffff' size='2x' />
                </button>
                <span className="titleForm">Petlovers</span>
                <Formik initialValues={initialValues} 
                    onSubmit={handleSubmit} 
                    validationSchema={validations} 
                    validateOnBlur>
                    <Form className='formulario'>
                        <span className="subtitle">Crie sua conta!</span>
                        <Input name='nome' placeHolder='Nome' noLabel />
                        <Input name='email' placeHolder='Email' noLabel />
                        <Input name='senha' placeHolder='Senha' noLabel password/>
                        <Input name='validation' placeHolder='Confirme a senha' noLabel  password/>
                        <button type='submit' className='buttonSend'>
                            <span>Criar conta</span>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Cadastro