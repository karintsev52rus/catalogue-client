import { ISparePart } from "../types/sparePart"
import { getImagePath } from "../helpers/getImagePath"
import { SparePartCard } from "./sparePartCard"

type SPListProps = {
    partList : ISparePart[]
}

const SparePartList: React.FC<SPListProps> = ({partList})=>{
    
    const sparePartList = partList.map((SPItem : ISparePart)=>{
  
        return (
            <SparePartCard
            partInfo = {SPItem}
            key = {SPItem.partNumber}
            />
        )
    })
    return (
        <>
        {sparePartList}
        </>
    )
}

export {SparePartList}