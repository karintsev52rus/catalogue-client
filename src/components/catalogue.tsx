import { CategoryCard } from "./categoryCard";
import { useEffect, useState } from "react";
import { getPartGroups } from "../actions/dataActions";
import Helmet from "react-helmet"

const Catalogue = ()=>{
    const [ groupsData, setGroupsData ] =  useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(()=>{
        getPartGroups()
        .then((data)=>{
            setGroupsData(data)
            setFetching(false)
        })
    }, [])

    return (
        <div className="container page-container">
            <Helmet>
                <title>Автоцентр | Запчасти для грузовых автомобилей</title>
            </Helmet>
            <h1 className="page-title"> Каталог	</h1>
            <div className="service-container">
                {!fetching? 
                groupsData.map((dataItem)=>{

                    return (
                        <CategoryCard
                        key = {dataItem.groupTitle}
                        categoryTitle = {dataItem.groupTitle}
                        categoryImage = {dataItem.imagePath}
                        categoryPath = {dataItem.groupPath}
                        />
                    )
                }) : 
                null
            }
            </div>
        </div>
    )
}

export {Catalogue}
