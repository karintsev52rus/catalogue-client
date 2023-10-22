import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { isAuthSelector } from "../../store/selectors";
import { checkAuth } from "../../store/thunks/userThunk";


const Layout: React.FC = ()=>{
    const appDispatch = useAppDispatch()
    const isAuth = useTypedSelector(isAuthSelector)

    useEffect(()=>{
        if (isAuth){
            appDispatch(checkAuth())
        }
    }, [])

    return (
        <>
        <Header/>
            <Outlet/>
        <Footer/>
        </>
    )
}

export {Layout}