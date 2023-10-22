import { useState, useEffect } from "react"
import { Button, FloatingLabel, Form, FormControl } from "react-bootstrap"
import { validateEmail } from "../helpers/validators"
import { ValidateInput } from "./common/validateInput"
import { setUser } from "../store/thunks/userThunk"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { userSelector } from "../store/selectors"
import { modalActions } from "../store/reducers/modalReducer"
import { userActions } from "../store/reducers/userReducer"
import { useNavigate } from "react-router-dom"


const AuthForm: React.FC = ()=>{

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState("")
    const [disabled, setDisabled] = useState(true)

    const appDispatch = useAppDispatch()
    const naigate = useNavigate()
    const {response} = useSelector(userSelector)
    const {status, message} = response

    const errors = [
        {errorType: emailError, value: email}
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

        if (status === "rejected"){

          appDispatch(modalActions.setModalInfo({modalTitle: "Ошибка!", modalMessage: message}))
          appDispatch(modalActions.setModalShow({show: true}))
          appDispatch(userActions.resetStatus())
        }
        if (status === "fulfilled"){
            appDispatch(userActions.resetStatus())
            naigate("/")
          }
  
      }, [status])

    const onLoginHandle = ()=>{
        appDispatch(setUser({email, password}))
        
    }

    return (
    <Form>
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
        label="Ваш пароль"
        className="mb-3"
        >
            <ValidateInput
            type="password"
            value={password}
            setValue={setPassword}
            />
        </FloatingLabel>

        <div className="d-flex justify-content-center" >
            <Button
            className="catalogue-button mt-3 me-3"
            disabled = {disabled}
            onClick = {onLoginHandle}
            >
                Вход
            </Button>

            <Button 
            onClick = {()=>{ naigate("/registration") }}
            className="catalogue-button mt-3">
                Регистрация
            </Button>
        </div>
    </Form>)
}

export {AuthForm}