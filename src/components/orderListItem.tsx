import { CreatedOrder } from "../types/sparePart"
import { Accordion } from "react-bootstrap"
import { OrderList } from "./orderList"
import { OrderDataItem } from "./orderDataItem"


const OrderListItem: React.FC<{order: CreatedOrder}> = ({order})=>{
    const {custData, orderData, orderList} = order
    const {orderNumber} = orderData

    return (
        <Accordion.Item eventKey={orderData.orderNumber.value}>
            <Accordion.Header>{orderNumber.value}</Accordion.Header>
            <Accordion.Body>
                <OrderDataItem label={orderData.orderDate.label} value={orderData.orderDate.value}/>

                <OrderList partList={orderList}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export {OrderListItem}