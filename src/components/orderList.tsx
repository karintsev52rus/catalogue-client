
import { ISparePartInCart } from "../types/sparePart"
import { Table } from "react-bootstrap"

const OrderList: React.FC<{partList: ISparePartInCart[] }> = ({partList})=>{

    const cartList = partList
    const totalPrice = cartList.reduce((previousValue: number, currentItem: ISparePartInCart)=>{
        return previousValue + currentItem.inCart * currentItem.price
    }, 0)


    return (
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Стоимость</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        {cartList.map((listItem)=>{
            return (
                <tr key = {listItem.partNumber}>
                <td> {listItem.title} </td>
                <td> {listItem.price} </td>
                <td>
                {listItem.inCart}
                </td>
                <td>{listItem.price * listItem.inCart}</td>
              </tr>
            )
          })
        }
      </tbody>
      <tfoot>
        <tr>
        <td colSpan = {3}>Всего:</td>
        <td  > {totalPrice} </td>
        </tr>
        
      </tfoot>
    </Table>
    )
}

export {OrderList}