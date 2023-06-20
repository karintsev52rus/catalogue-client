import { useSearchForm } from "../hooks/useSearchForm"
import { useState, useEffect } from "react";
import { DropDownList } from "./dropDownList";
import SearchIcon from "../assets/img/catalogue/magnifying-glass-solid.svg"
import { ISparePart } from "../types/sparePart";
import { useNavigate } from "react-router-dom";

const SearchForm: React.FC = ()=>{
    
    const {onInput, dropDownList, findData, inputValue, setInputValue} = useSearchForm()
    const [showDropdownList, setShowDropdownList] = useState(true)
    const [activeIndex, setActiveIndex] = useState(-1)
    const navigate = useNavigate()

    useEffect(()=>{
        if(dropDownList.length === 0){
            setShowDropdownList(false)
        }
        else{
            setShowDropdownList(true)
            setActiveIndex(-1)
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

    useEffect(()=>{
        
            document.addEventListener('keydown', keyPress)
        return ()=>{
            document.removeEventListener("keydown", keyPress)
        }
    })

    const getPartData = (listIndex: number): ISparePart | null => {
        if (dropDownList.length >= listIndex + 1 && listIndex > -1){
            return dropDownList[listIndex]
        }else return null
    }

    const keyPress = (e: KeyboardEvent)=>{

        switch (e.code) {
            case "ArrowDown":
                setActiveIndex((prevValue)=> prevValue + 1 )
                break

            case "ArrowUp":
                setActiveIndex((prevValue)=> prevValue - 1 )
                break

            case "Enter":
                const partData = getPartData(activeIndex)
                console.log(partData)
                if(partData){
                    navigate(`/${partData.rootGroup}/${partData.partNumber}`)
                    setActiveIndex(-1)
                    setShowDropdownList(false)
                }
                else{
                    findData()
                    setActiveIndex(-1)
                    setShowDropdownList(false)
                }
            
            case "Escape":
                setActiveIndex(-1)
                setShowDropdownList(false)
        }
    }
    
    return (
    <>
        <div className="search-input_container me-3">
            <input
            type = "text" 
            className ="search-input"
            placeholder="Название запчасти или артикул"
            onChange = {onInput}
            value = {inputValue}
            />
            {
                showDropdownList? <DropDownList
                setInputValue = {setInputValue}
                dropDownListData = {dropDownList} 
                activeIndex={activeIndex}
                /> : null
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