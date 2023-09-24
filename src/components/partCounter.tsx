import React, { useState, useEffect} from "react"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { Button, ButtonGroup, ModalTitle } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { cartActions } from "../store/reducers/cartReducer"
import { ISparePart } from "../types/sparePart";
import { modalActions } from "../store/reducers/modalReducer"
import { cartListErrorSelector } from "../store/selectors"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ModalWindow } from "./common/modalWindow"


const PartCounter: React.FC<{partInfo: ISparePart, inCart: number}> = ({partInfo, inCart})=>{
    const {setModalInfo, setModalShow, resetModalInfo} = modalActions
    const {setQuty, deletePart} = cartActions
    const { quantity} = partInfo
    const appDispatch = useAppDispatch()
    const [counter, setCounter] = useState(inCart)
    const {qtyInCartMoreThanStock} = useTypedSelector(cartListErrorSelector)

    const validateCounter = (qtyInCart: number, qtyInStock: number) :boolean =>{
        if (qtyInCart > qtyInStock){
            return false
        } else return true
    }

    useEffect(()=>{
        if(validateCounter(counter, quantity)){
            if (counter === 0){
                appDispatch(deletePart({partInfo: partInfo}))
                return
            }
            appDispatch(setQuty({partInfo: partInfo, quantity: counter}))
            if (qtyInCartMoreThanStock.error){
                appDispatch(cartActions.setCartQtyError({
                    errorType: qtyInCartMoreThanStock.errorType, 
                    error: false
                    }
                ))
            }
            appDispatch(resetModalInfo())
        } else{
            appDispatch(cartActions.setCartQtyError({
                errorType: qtyInCartMoreThanStock.errorType, 
                error: true
                }
            ))
            appDispatch(setModalShow({show: true}));
            appDispatch(setModalInfo({modalTitle: "Ошибка", modalMessage: qtyInCartMoreThanStock.errorMessage}))

        }
    }, [counter])

    const increment = ()=>{
        setCounter((prevCounter)=>{
            return prevCounter + 1
        })
    }

    const decrement = ()=>{
        setCounter((prevCounter)=>{
            return prevCounter - 1
        })
    }

    const inputCls = counter > inCart ? "error-input": null

    return(
    <>
        <ButtonGroup>
            <Button  variant="secondary"
            onClick = {decrement}
            >
                -
            </Button>
            <Form.Control
            className={`cart-modal-counter ${inputCls} `}
            value={counter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = +e.target.value
              if (!Number.isNaN(value)){
                setCounter(value)
              }
            }}
            />
            <Button  variant="secondary"
            onClick = {increment}>
                +
            </Button>
        </ButtonGroup>
        <ModalWindow/>
    </>
    )
}

export {PartCounter}