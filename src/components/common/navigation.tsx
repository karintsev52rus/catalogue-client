
import { useState } from "react"
import { Link } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { cartListSelector } from "../../store/selectors"
import { touch } from "../../assets/js/touch"
import { useSelector } from "react-redux"
import { isAuthSelector } from "../../store/selectors"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { userActions } from "../../store/reducers/userReducer"


const Navigation : React.FC = ()=>{

    const isAuth = useSelector(isAuthSelector)
    const appDispatch = useAppDispatch()

    const cartList = useTypedSelector(cartListSelector)
    const cartListLength = cartList.length

    touch()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = ()=>{
        setIsOpen(!isOpen)
    }

    return (
        <nav>
            <div
            onClick = {toggleMenu}
            className={ isOpen? "hamburger hamburger-active": "hamburger"} >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen? "menu header__menu menu-active" : "menu header__menu"}>
                <li className="menu-item">
                    <Link
                    onClick = {toggleMenu}
                    to = "/">Запчасти</Link>
                </li>

                
                <li className="menu-item">
                    <Link
                    onClick = {toggleMenu}
                    to="/cart"> Корзина  {cartListLength > 0 ? `(${cartListLength})` : "" } </Link>
                </li>
                
                <li className="menu-item">
                    <a href = "https://asc-nn.ru/">Сервис</a>
                </li>
                <li className="menu-item">
                    <a href = "https://asc-nn.ru/o-kompanii">О компании</a>
                </li>
                <li className="menu-item">
                    <a href = "https://asc-nn.ru/contacts">Контакты</a>
                </li>
                {isAuth?
                <>
                <li className="menu-item">
                    <Link
                    onClick = {toggleMenu}
                    to = "/orders">
                        Заказы
                    </Link>
                </li>
                <li 
                className="menu-item"
                >
                <Link
                to = "/"
                onClick = {()=>{
                    toggleMenu()
                    appDispatch(userActions.logout())
                }}
                >
                Выход
                </Link>
                </li>
                </>
                :
                <>
                <li className="menu-item">
                    <Link
                    onClick = {toggleMenu}
                    to = "/registration">
                        Регистрация
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                    onClick = {toggleMenu}
                    to = "/login">
                        Вход
                    </Link>
                </li>
                </>
            }
            </ul>
            <div className ="drop-down-button">  </div>
        </nav>
    )
}

export {Navigation}