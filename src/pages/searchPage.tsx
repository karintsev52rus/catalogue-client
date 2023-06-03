import { useParams } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import { SparePartList } from "../components/sparePartList"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { partListSelectors } from "../store/selectors"

import { ISparePart } from "../types/sparePart"

const SearchPage: React.FC = ()=>{

    const {searchPhrase} = useParams()
    const renderList: ISparePart[] = useTypedSelector(partListSelectors.renderListSelector)

    console.log(renderList)

    return (
        <div className="container page-container">
        <h1 className="page-title"> {searchPhrase.length > 0 ? `Результаты поиска по запросу ${searchPhrase}` : "Результаты поиска" } </h1>
        <div className="flex-container">
            <Sidebar/>
            
            <div className = "spare-parts_container">
                {renderList? 
                <SparePartList partList = {renderList}/> 
                :
                "По вашему запросу ничего не найдено"}
            </div>
        </div>
    </div>
    )
}

export {SearchPage}