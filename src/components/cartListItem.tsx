import {ISparePartInCart} from "../types/sparePart"
import { PartCounter } from "./partCounter"

const CartListItem: React.FC<{partInfo: ISparePartInCart}> = ({partInfo})=>{

    const {price, title, inCart, partNumber} = partInfo
    return (
        <tr key = {partNumber}>
          <td> {title} </td>
          <td> {price} </td>
          <td>
          <PartCounter partInfo={partInfo} inCart={inCart}/>
          </td>
          <td>{price * inCart}</td>
        </tr>
    )
}

export {CartListItem}