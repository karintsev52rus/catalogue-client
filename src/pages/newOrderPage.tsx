
import { OrderList } from "../components/orderList"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { cartListSelector, orderSelector, sendOrderSelector } from "../store/selectors"
import { modalActions } from "../store/reducers/modalReducer"
import { cartActions } from "../store/reducers/cartReducer"
import { CustDataForm } from "../components/custDataForm"
import { Loader } from "../components/common/loader"
import { ModalWindow } from "../components/common/modalWindow"
import { useEffect } from "react"
import { orderActions } from "../store/reducers/orderReducer"

const NewOrderPage: React.FC = ()=>{
  const {send} = useTypedSelector(orderSelector)
  const orderList = useTypedSelector(cartListSelector)
  const { status, message, loading } = send
  const appDispatch = useAppDispatch()

  useEffect(()=>{
    appDispatch(orderActions.resetOrder())
  }, [])
  
    useEffect (()=>{
        if (status){
            switch (status) {
                case "rejected":
                    appDispatch(modalActions.setModalInfo({modalMessage: message, modalTitle: "Ошибка!"}))
                    appDispatch(modalActions.setModalShow({show: true}))
                    break
                case "fulfilled":
                    appDispatch(modalActions.setModalInfo({modalMessage: message, modalTitle:"Заказ создан", redirectTo: "/orders"}))
                    appDispatch(modalActions.setModalShow({show: true}))
                    appDispatch(cartActions.setCartList({cartList: []}))
                    break
                default:
                    break;
                }
            }
        return
    }, [status])

    return (
    <div className="container page-container">
        <h1 className="page-title">
            Новый заказ
        </h1>
        <h3 className="service__header"> Состав заказа </h3>
        <OrderList partList={orderList} />
        <h3 className="service__header" > Данные покупателя </h3>
        <CustDataForm/>
        {loading ? <Loader/> : null} 
        <ModalWindow action={orderActions.resetOrder}/>

    </div>)
}

export {NewOrderPage}