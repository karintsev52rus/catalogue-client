import React from "react"
import { ISparePart } from "../types/sparePart"
import { Link, useLocation } from "react-router-dom"

type DropDownListProps = {
    dropDownListData: ISparePart[],
    setShowDropdownList: Function

}

const DropDownList:React.FC<DropDownListProps> = ({dropDownListData = [], setShowDropdownList})=>{


    return (
    <div className="dropdown-list">
        {dropDownListData.map((sparePartData: ISparePart)=>{
            return (
                <li className="dropdown-list_item"
                onClick={()=>{
                setShowDropdownList(false)
                }}
                key = {`${sparePartData.title}${sparePartData.partNumber}`}
                >
                <Link
                to = {`/${sparePartData.rootGroup}/${sparePartData.partNumber}`}>
                {sparePartData.title}
                </Link>
                </li>
            ) 
        })}
    </div>
    )
}
export {DropDownList}

