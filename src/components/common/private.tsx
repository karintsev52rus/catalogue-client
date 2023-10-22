import { useTypedSelector } from "../../hooks/useTypedSelector"
import { isAuthSelector } from "../../store/selectors"
import { Navigate } from "react-router-dom"
import { modalActions } from "../../store/reducers/modalReducer"
import { useAppDispatch } from "../../hooks/useAppDispatch"



interface PrivateProps {
    component: React.ComponentType
    path?: string
}

const Private : React.FC<PrivateProps> = ({component: RouteComponent})=>{

    const appDispatch = useAppDispatch()
    const isAuth = useTypedSelector(isAuthSelector)

    if (isAuth){
        return <RouteComponent/>
    }

    appDispatch(modalActions.setModalInfo({modalMessage: "Эта страница доступна только авторизованым пользователям", modalTitle: "Требуется авторизация"}))
    appDispatch(modalActions.setModalShow({show: true}))

    return <Navigate to = "/login"/>
}

export {Private}