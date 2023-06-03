import CloseIcon from "../assets/img/catalogue/xmark-solid.svg"
import FilterIcon from '../assets/img/catalogue/filter-solid.svg'
import { useState } from "react"


const Sidebar: React.FC = ()=>{

    const [expand, setExpand] = useState(false)

    const onClose = ()=>{
        setExpand(false)
    }

    const onExpand = ()=>{
        setExpand(true)
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
                        <li className="groupItem"> <input className="filter_checkbox" type="checkbox"/>Запчасти для ТО </li>
                        <li className="groupItem"><input className="filter_checkbox" type="checkbox"/> Ходовая </li>
                        <li className="groupItem"><input className="filter_checkbox" type="checkbox"/> Электрика</li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export {Sidebar}