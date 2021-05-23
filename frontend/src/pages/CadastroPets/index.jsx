import React, { useState, useEffect } from 'react'
import { useRequests } from '../../contexts/Requests'
import './CadastroPets.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import Navbar from '../../components/Navbar'
import Menu from '../../components/Menu'
import Input from '../../components/Input'
import Modal from '../../components/Modal'

const CadastroPets = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [initialValuesRaca, setInitialValuesRaca] = useState({ nome: '' })
    const { postDog, postBreed, listBreeds, getBreeds, uploadFotoPet } = useRequests()
    const history = useHistory()

    const [urlFoto, setUrlFoto] = useState('')

    useEffect(() => {
        getBreeds()
    }, [])

    async function changeFile(element) {
        const formData = new FormData();
        formData.append('file', element.target.files[0]);
        uploadFotoPet(formData).then(resp => {
            setUrlFoto(resp)
        })
    }

    async function newRaca(value) {
        await postBreed(value)
        setModalOpen(false)
        setInitialValuesRaca({ nome: '' })
    }

    async function newDog(values) {
        const request = values
        if(urlFoto != undefined) request.urlFoto = urlFoto
        postDog(request).then(() => {
            history.push('/mypets')
        })
    }

    const validateBreed = yup.object().shape({
        nome: yup.string().required('Nome necessario')
    })
    const validate = yup.object().shape({
        nome: yup.string().required('Nome necessario'),
        idade: yup.string().test('check-idade', 'Digite um numero inteiro', function (item) {
            return !isNaN(item)
        }).required('Idade necessaria'),
        breedId: yup.string().test('selected-breed', 'Selecione alguma raça', function (item) {
            return item !== undefined
        })
    })

    return (
        <>
            <Navbar setOpenMenu={setMenuOpen} />
            <Menu opened={menuOpen} setOpened={setMenuOpen} />
            <div className="contentCad">
                <div className="containerCad">
                    <div className="header">
                        <span>Cadastrar doguinho</span>
                    </div>

                    <div className="inputPhoto">
                        {urlFoto != '' ? (
                            <div className="photoDog">
                                <img src={urlFoto} alt="Foto doguinho" />
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
                        <Formik initialValues={{
                            nome: '',
                            idade: '',
                            breedId: '',
                            vermifugado: false,
                            castrado: false
                        }}
                            validationSchema={validate}
                            onSubmit={newDog}
                            validateOnChange>
                            <Form className="formCad">
                                <Input noLabel name='nome' placeHolder='Nome' />
                                <Input noLabel name='idade' placeHolder='Idade (em meses)' />
                                <div className="raca">
                                    <div className="inputColumn">
                                        <div className="selectInput">
                                            <Field as='select' name='breedId'>
                                                <option value="">Raça</option>
                                                {listBreeds.map((raca, i) => {
                                                    return <option key={`${i}breed`} value={raca.id}>{raca.nome}</option>
                                                })}
                                            </Field>
                                        </div>
                                        <ErrorMessage component='span' name='breedId' className='erroMsg' />
                                    </div>
                                    <button type='button' className='buttonIconAdd' onClick={() => setModalOpen(true)}>
                                        <FontAwesomeIcon icon={faPlus} color={'#F2AC05'} size='2x' />
                                    </button>
                                </div>
                                <div className="check">
                                    <Field type="checkbox" name="vermifugado" />
                                    <label htmlFor="vermifugado">Vermifugado</label>
                                </div>
                                <div className="check">
                                    <Field type="checkbox" name="castrado" />
                                    <label htmlFor="castrado">Castrado</label>
                                </div>
                                <button type='submit' className='filterButton'>
                                    <span>Cadastrar</span>
                                </button>
                            </Form>
                        </Formik>
                    </div>

                </div>
            </div>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <Formik initialValues={initialValuesRaca} validateOnBlur validationSchema={validateBreed} onSubmit={newRaca}>
                    <Form>
                        <div className="bodyModal">
                            <div className="titleModal">
                                <span>Nova Raça:</span>
                            </div>
                            <Input noLabel placeHolder='Raça' name='nome' />
                            <button type='submit' className='filterButton'>
                                <span>Cadastrar</span>
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

export default CadastroPets