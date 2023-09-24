import { Button } from "react-bootstrap";
import { CartList } from "../components/cartList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { cartListErrorSelector, cartListSelector } from "../store/selectors";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = ()=>{
    const cartList = useTypedSelector(cartListSelector)
    const navigate = useNavigate()
    const {qtyInCartMoreThanStock} = useTypedSelector(cartListErrorSelector)
    const disabled = qtyInCartMoreThanStock.error? true : false

    return (
        <div className="container page-container">
        <h1 className="page-title">Корзина</h1>
        <CartList/>
        { cartList.length > 0 ? 
        <Button 
        disabled={disabled} 
        className= "catalogue-button"
        onClick={()=>{ navigate("/orders/new_order") }}

        > Сделать заказ 
        </Button> : null }

    </div>
    )
    
}

export {CartPage}