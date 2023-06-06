import { useSearchForm } from "../hooks/useSearchForm"
import { useState, useEffect, useRef, RefObject } from "react";
import { DropDownList } from "./dropDownList";
import SearchIcon from "../assets/img/catalogue/magnifying-glass-solid.svg"

const SearchForm: React.FC = ()=>{
    
    const {onInput, dropDownList, findData} = useSearchForm()
    const [showDropdownList, setShowDropdownList] = useState(true)

    useEffect(()=>{
        if(dropDownList.length === 0){
            setShowDropdownList(false)
        }
        else{
            setShowDropdownList(true)
        }
    }, [dropDownList])

    const closeHandler = (e:MouseEvent)=>{

        const target = e.target as HTMLUListElement
        if (!target.classList.contains("dropdown-list_item")){
            setShowDropdownList(false)
        }
    }

    useEffect(()=>{
        if(showDropdownList){
            document.addEventListener('click', closeHandler)
        }
    }, [])
    
    return (
    <>
        <div className="search-input_container me-3">
            <input
            type = "text" 
            className ="search-input"
            placeholder="Название запчасти или артикул"
            onChange = {onInput}
            />
            {
                showDropdownList? <DropDownList setShowDropdownList = {setShowDropdownList} dropDownListData = {dropDownList} /> : null
            }

        </div>
        <button
        onClick = {()=>{
            findData()
        }}
        className="catalogue-button search-button">  
            <span className="button-text">ПОИСК</span>
            <img src={SearchIcon} alt="search icon" className="search-icon" /> 
        </button>
    </>
    )
}

export {SearchForm}