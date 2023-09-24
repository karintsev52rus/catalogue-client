
import { OrderList } from "../components/orderList"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { orderSelector, sendOrderSelector } from "../store/selectors"
import { modalActions } from "../store/reducers/modalReducer"
import { cartActions } from "../store/reducers/cartReducer"
import { CustDataForm } from "../components/custDataForm"
import { Loader } from "../components/common/loader"
import { ModalWindow } from "../components/common/modalWindow"
import { useEffect } from "react"
import { orderActions } from "../store/reducers/orderReducer"


const NewOrderPage: React.FC = ()=>{
  const {send, custData} = useTypedSelector(orderSelector)
  const { error, sended, responseMessage, loading } = send
  const appDispatch = useAppDispatch()
    useEffect (()=>{
        if (sended){
            if (!error){
                appDispatch(modalActions.setModalInfo({modalMessage: responseMessage, modalTitle:"Заказ создан"}))
                appDispatch(cartActions.setCartList({cartList: []}))
            }
            else {
                appDispatch(modalActions.setModalInfo({modalMessage: responseMessage, modalTitle: "Ошибка!"}))
            }
            appDispatch(modalActions.setModalShow({show: true}))
        }
    }, [sended])

    return (
    <div className="container page-container">
        <h1 className="page-title">
            Новый заказ
        </h1>
        <h3 className="service__header"> Состав заказа </h3>
        <OrderList/>
        <h3 className="service__header" > Данные покупателя </h3>
        <CustDataForm/>
        {loading ? <Loader/> : null}
        {sended ? <ModalWindow action={orderActions.resetOrder}/> : null}

    </div>)
}

export {NewOrderPage}