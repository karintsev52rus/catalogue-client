import { Accordion } from "react-bootstrap"
import { CreatedOrder } from "../types/sparePart"
import { OrderListItem } from "./orderListItem"

interface ordersListProps {
    orders: CreatedOrder[]
}

const OrdersList: React.FC<ordersListProps> = ({orders})=>{
    if (orders.length === 0){
        return <p> Список заказов пуст </p>
    } else {
        return (<Accordion flush>
        {orders.map((order)=>{
            return (
            <OrderListItem 
            order={order}
            key={order.orderData.orderNumber.value}
            />)
        })
        }
        </Accordion>)
    }
}

export {OrdersList}