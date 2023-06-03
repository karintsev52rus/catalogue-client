import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = ()=>{

    return (
        <>
        <Header/>
            <Outlet/>
        <Footer/>
        </>
    )
}

export {Layout}