import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import Navbar from '../../components/Navbar'
import { useRequests } from '../../contexts/Requests'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { Form, Formik } from 'formik'
import Input from '../../components/Input'
import { useHistory } from 'react-router-dom'


const Configuracao = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { uploadFotoUser, postUser } = useRequests()
    const [initialValues, setInitialValues] = useState(undefined)
    const user = JSON.parse(localStorage.getItem('@myuser'))
    useEffect(() => {
        setInitialValues({
            nome: user.nome,
            email: user.email
        })
        if (user.urlFoto) setUrlFoto(user.urlFoto)
    }, [])

    const history = useHistory()

    const [urlFoto, setUrlFoto] = useState('')

    async function changeFile(element) {
        if (element.target.files[0].size > 4500000) {
            alert('Tamnho de imagem superior a 4mb, selecione outra imagem!')
            return;
        }
        const formData = new FormData();
        formData.append('file', element.target.files[0]);
        uploadFotoUser(formData).then(resp => {
            setUrlFoto(resp)
        })
    }

    const validate = yup.object().shape({
        nome: yup.string().required('Nome necessario'),
        email: yup.string().email('Digite um email valido').required('Email necessario')
    })

    function handleSubmit(values){
        const request = values
        if(urlFoto != '') request.urlFoto = urlFoto
        request.userId = user.id
        postUser(request).then(() => {
            history.push('mypets')
        })
    }

    return (
        <>
            <Navbar setOpenMenu={setMenuOpen} />
            <Menu opened={menuOpen} setOpened={setMenuOpen} />
            <div className="contentCad">
                <div className="containerCad">
                    <div className="header">
                        <span>Editar Usuario</span>
                    </div>

                    <div className="inputPhoto">
                        {urlFoto != '' ? (
                            <div className="photoDog">
                                <img src={urlFoto} alt="Foto usuario" />
                            </div>
                        ) : (
                            <div className='inputNone'>
                                <input id='file' type="file" name='files' accept='image/*' onChange={e => changeFile(e)} />
                                <label htmlFor="file" className='labelInputNone'>
                                    <FontAwesomeIcon icon={faImage} color={'rgba(242, 172, 5,0.3)'} size='7x' />
                                    <span>Selecionar Foto</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="bodyCad">
                        {initialValues && (
                            <Formik initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validate}
                                validateOnChange>
                                <Form className="formCad">
                                    <Input noLabel name='nome' placeHolder='Nome' />
                                    <Input noLabel name='email' placeHolder='Email' />
                                    <button type='submit' className='filterButton'>
                                        <span>Editar</span>
                                    </button>
                                </Form>
                            </Formik>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Configuracao