import { useEffect } from "react";
import { ISparePart } from "../types/sparePart";
import { Link } from "react-router-dom";

interface IDDListItemProps {
  index: number;
  activeIndex : number;
  sparePartData: ISparePart;
  setInputValue: Function
}

const DropDownListItem: React.FC <IDDListItemProps> = ({index, activeIndex, sparePartData, setInputValue}) => {


  const onClickListItem = (title: string)=>{
    setInputValue(title)
    console.log(title)
}

  const listItemClass = index === activeIndex ? "dropdown-list_item-active" : ""

  useEffect(()=>{
    if (index === activeIndex){
      const item = document.querySelector(".dropdown-list_item-active")
      if (item){
        item.scrollIntoView(false)
      }
    }
  }, [activeIndex])

  return <li className={`dropdown-list_item ${listItemClass}`}
          onClick={()=>{onClickListItem(sparePartData.title)}}
          >
          <Link
            to = {`/${sparePartData.rootGroup}/${sparePartData.partNumber}`}>
            {sparePartData.title}
          </Link>
        </li>;
};

export { DropDownListItem };
