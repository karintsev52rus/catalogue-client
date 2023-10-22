import { useState, useEffect, useCallback } from "react"
import { Form, Col, FloatingLabel, Button } from "react-bootstrap"
import { validateCustName, validateEmail, validatePhone, validatorInputType } from "../helpers/validators"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { sendNewOrder } from "../store/thunks/orderThunk"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { cartListSelector, orderSelector } from "../store/selectors"
import { ModalWindow } from "./common/modalWindow"
import { useNavigate } from "react-router-dom"
import { userSelector } from "../store/selectors"
import { ValidateInput } from "./common/validateInput"
import { modalActions } from "../store/reducers/modalReducer"


const CustDataForm: React.FC = ()=>{

    const {user} = useTypedSelector(userSelector)
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [phoneNumber, setPhoneNumber] = useState(user.phone)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false)
    const [name, setName] = useState(user.name)
    const [disabled, setDisabled] = useState(true)
    const appDispatch = useAppDispatch()
    const cartList = useTypedSelector(cartListSelector)

    const navigate = useNavigate()

    useEffect(()=>{
      if (!cartList.length){
        setEmptyCart(true)
      }
    }, [cartList])

    const errors = [
      {errorType: emailError, value: email}, 
      {errorType: phoneError, value: phoneNumber}, 
      {errorType: nameError, value: name},
      {errorType: emptyCart }
    ]
    const haveErrors = errors.filter((err)=>{
      return err.errorType === true || err.value?.length === 0
    })

    const createNewOrder = ()=>{
        const custData = {
          custName: name,
          custEmail: email,
          custPhone: phoneNumber,
        }

        const orderProps = {custData, orderList: cartList}
        appDispatch(sendNewOrder(orderProps))
      } 

    useEffect(()=>{
        if(haveErrors.length > 0){
          setDisabled(true)
        } else {setDisabled(false)}
      }, [haveErrors])

    return (<>
    <Form>
        <Col sm = "6">
        <FloatingLabel
            label="Ваше имя"
            className="mb-3"
            >
                <ValidateInput
                value = {name}
                setValue={setName}
                validator={validateCustName}
                error={nameError}
                setError={setNameError}
                />
            </FloatingLabel>
            <FloatingLabel
            label="Ваш email"
            className="mb-3"
            >
                <ValidateInput
                value={email}
                setValue = {setEmail}
                validator={validateEmail}
                error= {emailError}
                setError={setEmailError}
                />
            </FloatingLabel>
            <FloatingLabel
            label="Номер телефона"
            className="mb-3"
            >
                <ValidateInput
                value={phoneNumber}
                setValue = {setPhoneNumber}
                validator={validatePhone}
                error= {phoneError}
                setError={setPhoneError}
                />
            </FloatingLabel>
        </Col>
        </Form>
        
        <Button
        type = "submit"
        onClick = {()=>{
          createNewOrder()
        }}
        disabled = {disabled}
        className = "catalogue-button" >
            Отправить заказ
        </Button>
    </>
    )
}

export {CustDataForm}