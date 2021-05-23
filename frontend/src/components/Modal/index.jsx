import React from 'react'
import './Modal.css'

const Modal = ({setOpen, open, children}) => {
    return (
        <div id='backdropModal' className={open ? 'backdropModal opened' : 'backdropModal'} onClick={event => {
            if(event.target.id === 'backdropModal'){
                setOpen(false)
            }
        }}>
            <div className="modal">
                {children}
            </div>
        </div>
    )
}

export default Modal