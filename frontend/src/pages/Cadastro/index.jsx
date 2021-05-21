import React from 'react'
import { Formik, Form } from 'formik'
import Input from '../../components/Input'

const Cadastro = () => {
    return (
        <div className="contentCadastro">
            <div className="image"></div>
            <div className="form">
                <span className="titleForm">Petlovers</span>
                <span className="subtitle">Crie sua conta</span>
                <Formik initialValues={{ email: '', senha: '' }} onSubmit={values => console.log(values)} >
                    <Form>
                        <Input name='nome' placeHolder='Nome' noLabel />
                        <Input name='email' placeHolder='Email' noLabel />
                        <Input name='senha' placeHolder='Senha' noLabel />
                        <Input name='validation' placeHolder='Confirme a senha' noLabel />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Cadastro