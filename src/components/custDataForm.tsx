import { useState, useEffect, useCallback } from "react"
import { Form, Col, FloatingLabel, Button } from "react-bootstrap"
import { validateCustName, validateEmail, validatePhone, validatorInputType } from "../helpers/validators"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { orderActions } from "../store/reducers/orderReducer"
import { sendNewOrder } from "../store/thunks/orderThunk"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { cartListSelector, orderSelector } from "../store/selectors"
import { SmartCaptcha } from "@yandex/smart-captcha"
import { modalActions } from "../store/reducers/modalReducer"
import { ModalWindow } from "./common/modalWindow"
import { useNavigate } from "react-router-dom"


const CustDataForm: React.FC = ()=>{
    const {custData} = useTypedSelector(orderSelector)
    const {custEmail, custName, custPhone} = custData

    const [email, setEmail] = useState(custEmail.value)
    const [phoneNumber, setPhoneNumber] = useState(custPhone.value)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false)
    const [name, setName] = useState(custName.value)
    const [custNameError, setCustNameError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const {createOrder} = orderActions
    const appDispatch = useAppDispatch()
    const cartList = useTypedSelector(cartListSelector)
    const navigate = useNavigate()
    
    const [status, setStatus] = useState('hidden');
    const handleChallengeVisible = useCallback(() => setStatus('visible'), []);
    const handleChallengeHidden = useCallback(() => setStatus('hidden'), []);
    const handleNetworkError = useCallback(() => setStatus('network-error'), []);
    const handleSuccess = useCallback((token: string) => {
      setStatus('success');
      setToken(token);
    }, []);
    const handleTokenExpired = useCallback(() => {
      setStatus('token-expired');
      setToken('');
    }, []);

    const [token, setToken] = useState('');
    const clientKey = process.env.YA_KEY

    useEffect(()=>{
      if (!cartList.length){
        setEmptyCart(true)
      }
    }, [cartList])

    const errors = [
      {errorType: emailError, value: email}, 
      {errorType: phoneError, value: phoneNumber}, 
      {errorType: custNameError, value: name},
      {errorType: emptyCart }
    ]
    const haveErrors = errors.filter((err)=>{
      return err.errorType === true || err.value?.length === 0
    })




    const createNewOrder = ()=>{
        const custData = {
          custName: {value: name, label: "Имя"},
          custEmail: {value: email, label: "Email"},
          custPhone: {value: phoneNumber, label: "Телефон"},
        }
        const orderDate = {value: new Date().toLocaleDateString(), label: "Дата"}
        const orderTime =  {value: new Date().toLocaleTimeString(), label: "Время"}
        const orderNumber = {value: `${orderDate.value}-${orderTime.value}`, label: "Номер заказа"}
        const orderData = {
          orderDate,
          orderTime,
          orderNumber
        }

        if(status !== 'success'){
          appDispatch(modalActions.setModalInfo({modalTitle: "Ошибка!", modalMessage: "Подтвердите, что вы не робот!"}))
          appDispatch(modalActions.setModalShow({show: true}))
          return
        }



        const orderProps = {custData, orderData, orderList: cartList}
        appDispatch(createOrder({orderProps}))
        appDispatch(sendNewOrder(orderProps))
      } 

    useEffect(()=>{
        if(haveErrors.length > 0){
          setDisabled(true)
        } else {setDisabled(false)}
      }, [haveErrors])

    interface onInputProps {
        setValue: Function,
        validator?: validatorInputType,
        setError : Function,
      }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>, inputProps: onInputProps)=>{
        const { validator, setError, setValue } = inputProps
        setValue(e.target.value)
        if (validator){
          if (validator(e.target.value)){
            setError(false)
          } else setError(true)
        }
      }

    return (<>
    <Form>
        <Col sm = "6">
            <FloatingLabel
            controlId="floatingInput"
            label="Ваше имя"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="Имя" required = {true} autoComplete="on"
            name = "name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onInput(e, {
              setValue : setName, 
              validator : validateCustName,
              setError: setCustNameError
            })}}
            value = {name}
            isInvalid = {custNameError}
            />
        </FloatingLabel>
        </Col>
        <Col sm = "6">
            <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
        >
            <Form.Control type="email" placeholder="name@example.com" required = {true} autoComplete="on"
            name = "email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onInput(e, {
              validator: validateEmail,
              setValue: setEmail, 
              setError: setEmailError
            })}}
            value = {email}
            isInvalid = {emailError}
            />
        </FloatingLabel>
        </Col>
        <Col sm = "6">
        <FloatingLabel
            controlId="floatingInput"
            label="Телефон"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="+71234567890" name="phone"  required = {true} autoComplete="on"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onInput(e, {
              setValue: setPhoneNumber,
              setError: setPhoneError,
              validator: validatePhone
            })}}
            value={phoneNumber}
            isInvalid = {phoneError}
            />
        </FloatingLabel>
        </Col>
        </Form>
        <div className="mt-3 mb-3">
          <SmartCaptcha
          sitekey={clientKey}
          language = "ru"
          onChallengeVisible={handleChallengeVisible}
          onChallengeHidden={handleChallengeHidden}
          onNetworkError={handleNetworkError}
          onSuccess={handleSuccess}
          onTokenExpired={handleTokenExpired}
          />
        </div>
        
        <Button
        type = "submit"
        onClick = {()=>{
          createNewOrder()
        }}
        disabled = {disabled}
        className = "catalogue-button" >
            Отправить заказ
        </Button>
        <ModalWindow/>
    </>
    )
}

export {CustDataForm}