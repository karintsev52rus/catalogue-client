import Logo from "../../assets/img/icons/logo.svg"
import { touch } from "../../assets/js/touch"
import { SearchForm } from "../searchForm"
import { useState } from "react"
import { Link } from "react-router-dom"


const Header: React.FC = ()=>{

    touch()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = ()=>{
        setIsOpen(!isOpen)
    }

    return (
        <>
        <header>
        <div className="header">
            <div className="container">
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
                            <a href = "https://asc-nn.ru/">Главная</a>
                        </li>
                        <li className="menu-item">
                            <a href = "https://asc-nn.ru/services">Услуги</a>
                        </li>
                        <li className="menu-item">
                            <Link
                            onClick = {toggleMenu}
                            to = "/">Запчасти</Link>
                        </li>
                        <li className="menu-item">
                            <a href = "https://asc-nn.ru/foto">Фото</a>
                        </li>
                        <li className="menu-item">
                            <a href = "https://asc-nn.ru/o-kompanii">О компании</a>
                        </li>
                        <li className="menu-item">
                            <a href = "https://asc-nn.ru/contacts">Контакты</a>
                        </li>
                    </ul>
                    <div className ="drop-down-button">  </div>
                </nav>
            </div>
            <div className="subheader">
                <div className="subheader__container container">
                    <Link to= "/" className="logo header__logo">
                        <img className='logo__image' src={Logo} alt=""/>
                    </Link>
                    <div className="contact-info subheader__contact-info">
                        <div className="contact-info__item">
                            <div className="contact-info__phone-icon">
                            </div>
                            <div className="contact-info__phone">
                                <a href="tel:+78313314442" className="link phone_number"> 8 8313 31 44 42 </a>
                                <div> Автосервис </div>
                            </div>
                        </div>
                        <div className="contact-info__item">
                            <div className="contact-info__phone-icon">
                            </div>
                            <div className="contact-info__phone">
                                <a href="tel:89036046426" className="link phone_number">+7 903 604 64 26</a>
                                <div> Запчасти </div>
                            </div>
                        </div>
                        <div className="contact-info__item">
                            <div  className="contact-info__address-icon"></div>
                            <span className="contact-info__address">
                                Нижегородская область <br></br>
                                Дзержинск, Автозаводское шоссе 81 корп. 6
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</header>
    <div className="container search-form_container">
    <SearchForm/>
</div>
        </>
    )
}

export {Header}