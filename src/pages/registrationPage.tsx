import { RegistrationForm } from "../components/registrationForm"
import { Col } from "react-bootstrap"
import { ModalWindow } from "../components/common/modalWindow"

const RegistrationPage: React.FC = ()=>{

    return (
    <div className="container page-container">
        <h1 className="page-title">
            Регистрация
        </h1>
        
        <Col sm = "6" className="mx-auto mt-5">
            <p className="text-center"> Для регистрации нового пользователя заполните все обязательные поля </p>
        <RegistrationForm/>
        </Col>
        <ModalWindow/>
        
    </div>)
}

export {RegistrationPage}