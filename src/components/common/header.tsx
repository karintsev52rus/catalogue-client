import Logo from "../../assets/img/icons/logo.svg"
import { SearchForm } from "../searchForm"
import { Link } from "react-router-dom"
import { Navigation } from "./navigation"



const Header: React.FC = ()=>{

    return (
        <>
        <header>
        <div className="header">
            <div className="container">
                <Navigation/>
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
                                <a href="tel:89092939196" className="link phone_number">+7 909 293 91 96</a>
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