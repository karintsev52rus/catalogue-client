import { useEffect, useState } from "react"
import { ISparePart } from "../types/sparePart"
import { PartImage } from "./partImage"
import { getImage } from "../actions/dataActions"
import { Link } from "react-router-dom"

type SPCardProps = {
    partInfo: ISparePart
}

const SparePartCard:React.FC<SPCardProps> = ({partInfo})=>{
    const {title, price, brand, partNumber, rootGroup, quantity} = partInfo

    return (
        <div className="spare-part_card">
            <div className="spare-part-card_image_container">
                <PartImage partNumber={partNumber}/>
            </div>
            
            <div className="divider"></div>
            <div className = "spare-part_info">
                <div className="spare-part_title spare-part_prop">{title}</div>
                {/* <div className="spare-part_brand spare-part_prop">
                    <span className = "spare-part_prop_name"> бренд:</span  ><span className = "spare-part_prop_value">{brand}</span>
                </div> */}
                <div className="spare-part_price spare-part_prop">
                    <span className = "spare-part_prop_name"> цена: </span> <span className = "spare-part_prop_value" > {price}  Р</span>
                </div>
                <div className="spare-part_available spare-part_prop">
                    {quantity > 0 ? <span className = "spare-part_prop_value in-stock" > В наличии </span> :
                        <span className = "spare-part_prop_value out-stock" > Под заказ </span>
                    }
                    
                </div>
            </div>
            <Link to = {`/${rootGroup}/${partNumber}`}>
                <button className = "catalogue-button"> Подробнее </button>
            </Link>
        </div>
    )
}

export {SparePartCard}