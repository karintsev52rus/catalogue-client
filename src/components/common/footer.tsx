import Logo from "../../assets/img/icons/logo.svg"

const Footer: React.FC = ()=>{

    const date = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer__container ">
                <div className="footer__logo logo">
                <img className='logo__image' src={Logo} alt=""/>
                </div>
                <div className="copyright">
                    &#169; ООО "АвтоЦентр-НН" <br/>
                    <span className = "year"> {date} </span>
                </div>
            </div>
        </footer>
    )
}

export {Footer}