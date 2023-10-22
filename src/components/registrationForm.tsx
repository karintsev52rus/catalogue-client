import { useState, useEffect } from "react"
import {Form, FloatingLabel} from "react-bootstrap"
import {Button} from "react-bootstrap"
import { validateCustName, validateEmail, validatePassword, validatorInputType, checkRepeatPassword, validatePhone } from "../helpers/validators"
import { modalActions } from "../store/reducers/modalReducer"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { ValidateInput } from "./common/validateInput"
import { createUser } from "../store/thunks/userThunk"
import { useSelector } from "react-redux"
import { userSelector } from "../store/selectors"
import { loaderActions } from "../store/reducers/loaderReducer"
import { userActions } from "../store/reducers/userReducer"

const RegistrationForm = ()=>{
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState("")
    const [pwdError, setPwdError] = useState(false)
    const [repeatPwd, setRepeatPwd] = useState("")
    const [repeatPwdError, setRepeatPwdError] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const appDispatch = useAppDispatch()
    const {response} = useSelector(userSelector)
    const {status, message} = response

    const errors = [
        {errorType: emailError, value: email}, 
        {errorType: nameError, value: name},
        {errorType: pwdError, value: password},
        {errorType: repeatPwdError, value: repeatPwd},
        {errorType: phoneError, value: phoneNumber}

      ]
      const haveErrors = errors.filter((err)=>{
        return err.errorType === true || err.value?.length === 0
      })

    useEffect(()=>{
        if(haveErrors.length > 0){
          setDisabled(true)
        } else {setDisabled(false)}
      }, [haveErrors])

    useEffect(()=>{
      if (status === "pending"){
        appDispatch(loaderActions.setLoader({show: true}))
      }

      if (status === "fulfilled"){
        appDispatch(loaderActions.setLoader({show: false}))
        appDispatch(modalActions.setModalInfo({modalTitle: "Успех!", modalMessage: message}))
        appDispatch(modalActions.setModalShow({show: true}))
        appDispatch(userActions.resetStatus())
      }

      if (status === "rejected"){
        appDispatch(loaderActions.setLoader({show: false}))
        appDispatch(modalActions.setModalInfo({modalTitle: "Ошибка!", modalMessage: message}))
        appDispatch(modalActions.setModalShow({show: true}))
        appDispatch(userActions.resetStatus())
      }

    }, [status])


    const regHandle = ()=>{
        const regData = {
            email: email,
            name: name,
            password: password,
            phone: phoneNumber
        }
        appDispatch(createUser(regData))
    }


    return (
        <Form>
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
            <FloatingLabel
            label="Придумайте пароль"
            className="mb-3"
            >
                <ValidateInput
                type = "password"
                value = {password}
                setValue={setPassword}
                validator={validatePassword}
                setError={setPwdError}
                error = {pwdError}
                />
            </FloatingLabel>
            <FloatingLabel
            label="Повторите пароль"
            className="mb-3"
            >
                <ValidateInput
                type = "password"
                value = {repeatPwd}
                setValue={setRepeatPwd}
                validator={checkRepeatPassword}
                setError={setRepeatPwdError}
                error = {repeatPwdError}
                compareValue={password}
                />
            </FloatingLabel>
            <Button
            onClick = {regHandle}
            disabled = {disabled}
            className="catalogue-button mx-auto"
            >
                Зарегистрироваться
            </Button>
        </Form>
        
    )
}

export {RegistrationForm}