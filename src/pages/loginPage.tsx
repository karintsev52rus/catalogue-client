import { AuthForm } from "../components/authForm"
import { Col } from "react-bootstrap"
import { ModalWindow } from "../components/common/modalWindow"
import { Loader } from "../components/common/loader"
import { loaderSelector } from "../store/selectors"
import { useSelector } from "react-redux"

const LoginPage: React.FC = ()=>{


    return (
        <div className="container page-container">
            <h1 className="page-title">
                Вход
            </h1>
            <Col 
            sm = "6" 
            className="mx-auto mt-5">
                <AuthForm/>
            </Col>
            <ModalWindow/>
        </div>)
}

export {LoginPage}