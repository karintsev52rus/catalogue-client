import { useTypedSelector } from "../hooks/useTypedSelector"
import { cartListSelector } from "../store/selectors"
import { Table} from "react-bootstrap"
import { ISparePartInCart } from "../types/sparePart"
import { CartListItem } from "./cartListItem"

const CartList: React.FC = ()=>{

    const cartList:ISparePartInCart[] = useTypedSelector(cartListSelector)

    if(cartList.length > 0){
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
              <CartListItem key = {listItem.partNumber} partInfo = {listItem} />
            )
          })
        }
      </tbody>
    </Table>
        )
    } else {
        return <>Корзина пуста</>
    }
}

export {CartList}