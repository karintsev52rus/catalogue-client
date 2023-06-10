import CloseIcon from "../assets/img/catalogue/xmark-solid.svg"
import FilterIcon from '../assets/img/catalogue/filter-solid.svg'
import { useState, useEffect } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import {partListSelectors} from "../store/selectors"
import { partListActions } from "../store/reducers/partListReducer"
import { useDispatch } from "react-redux"
import { usePartList } from "../hooks/usePartList"



const Sidebar: React.FC = ()=>{
    const dispatch = useDispatch()

    const [expand, setExpand] = useState(false)
    const partGroups = useTypedSelector(partListSelectors.parentGroupsSelector)
    const {onLoadParts} = usePartList()

    useEffect(()=>{

        dispatch({type: partListActions.SET_SELECTED_LIST})
        onLoadParts()
    }, [partGroups])

    const onClose = ()=>{
        setExpand(false)
    }

    const onExpand = ()=>{
        setExpand(true)
    }

    const changePartGroupsList = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
        const group = {name: e.target.name, index : index, checked: e.target.checked}
        dispatch({type: partListActions.UPDATE_PARENT_GROUP_LIST, payload: {group}})
        dispatch({type: partListActions.CLEAR_RENDERED_LIST})
    }

    return (
        <aside className="catalogue_sidebar">
        <button className="sidebar_expand action-button"
        onClick = {onExpand}
        >
            <span className="action-button_title"> Фильтр </span> 
            <img className="action-button_image" src={FilterIcon} alt="" />
        </button>
            <div className={expand? `sidebar_content` : 'sidebar_content sidebar_content-hidden' }>
                <button
                className = "close-button action-button"
                onClick={onClose}
                >
                    <img className="action-button_image" src={CloseIcon} alt="" />
                </button>
                <div className="filter">
                    <ul className="groups">
                        <span className="group_title">
                            Группы :
                        </span>
                        {partGroups.groups.map((group, index)=>{
                            return (
                                <li className="groupItem"
                                key={`${group.name}${index}`}> 
                                    <input 
                                    className="filter_checkbox" 
                                    type="checkbox"
                                    name = {group.name}
                                    checked = {group.checked}
                                    onChange={(e)=>{ changePartGroupsList (e, index) }}
                                    />
                                    {group.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export {Sidebar}