import React from "react"
import { ISparePart } from "../types/sparePart"
import { DropDownListItem } from "./dropDownListItem"

type DropDownListProps = {
    dropDownListData: ISparePart[],
    activeIndex: number,
    setInputValue: Function
}

const DropDownList:React.FC<DropDownListProps> = ({dropDownListData = [], activeIndex, setInputValue})=>{

    

    return (
    <div className="dropdown-list">
        {dropDownListData.map((sparePartData: ISparePart, index)=>{
            return (
            <DropDownListItem
                setInputValue = {setInputValue}
                index = {index}
                activeIndex = {activeIndex}
                key = {`${sparePartData.title}${sparePartData.partNumber}`}
                sparePartData={sparePartData}
                />
            ) 
        })}
    </div>
    )
}
export {DropDownList}

