import { Modal, Button } from "react-bootstrap"
import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { modalSelector } from "../../store/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { modalActions } from "../../store/reducers/modalReducer";
import { useNavigate } from "react-router-dom";

const ModalWindow: React.FC<{action?: Function, redirectTo?: string}> = ({action}) =>{
    const modalInfo = useTypedSelector(modalSelector)
    const appDispatch = useAppDispatch()
    const {modalMessage, modalTitle, show, redirectTo} = modalInfo
    const navigate = useNavigate()
    

    const handleClose = () => {
      
      appDispatch(modalActions.setModalShow({show: false}))
      if (action){
        appDispatch(action())
      }
      if (redirectTo){
        navigate(redirectTo)
      }
    };

    const modal = show? <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='mb-3'>
      {modalMessage}
      </div>
    </Modal.Body>
    <Modal.Footer>
    <button className = "catalogue-button  mt-2 " onClick={handleClose}> Ок </button>
    </Modal.Footer>
  </Modal> :
  null

    return (
        <>
          {modal}
        </>
    )
}

export {ModalWindow}