import {useEffect} from "react"
import { OrdersList } from "../components/ordersList"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { ordersSelector } from "../store/selectors"
import { getUserOrders } from "../store/thunks/orderThunk"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { Loader } from "../components/common/loader"
import { modalActions } from "../store/reducers/modalReducer"



const OrdersPage: React.FC = ()=>{

    const {orders, loading, status, message} = useTypedSelector(ordersSelector)
    const appDispatch = useAppDispatch()
    

    useEffect(()=>{
        if(orders.length === 0){
            appDispatch(getUserOrders())
        }
    }, [])

    useEffect(()=>{
        if(status === "rejected"){
            appDispatch(modalActions.setModalInfo({modalMessage: message, modalTitle: "Ошибка!"}))
            appDispatch(modalActions.setModalShow({show: true}))
        }
    }, [status])

    return (
        <div className="container page-container">
        <h1 className="page-title">
            Заказы
        </h1>
        {loading? <Loader/> : <OrdersList orders={orders}/>}
        
    </div>
    )
}

export {OrdersPage}