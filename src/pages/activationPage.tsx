import { useParams } from "react-router-dom"
import {useEffect, useState} from 'react'
import { activation } from "../actions/activation"
import { modalActions } from "../store/reducers/modalReducer"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { ModalWindow } from "../components/common/modalWindow"

const ActivationPage: React.FC = ()=>{
    const [activate, setActivate] = useState(false)
    const [loading, setLoading] = useState(false)
    const appDispatch = useAppDispatch()

    const {activationLink} = useParams()

    useEffect(()=>{
        setLoading(true)
        activation(activationLink)
        .then((data)=>{
            setLoading(false)
            if (data instanceof Error){
                appDispatch(modalActions.setModalInfo({modalMessage: data.message, modalTitle: "Ошибка!"}))
            } else {
                appDispatch(modalActions.setModalInfo({modalMessage: data.message, modalTitle: "Активация"}))
                setActivate(true)
            }
            appDispatch(modalActions.setModalShow({show: true}))
        })
        
    }, [activationLink])

    return (<div className="container page-container">
    <h1 className="page-title">
        Активация
    </h1>
    <ModalWindow/>

</div>)
}

export {ActivationPage}