import { SparePartList } from "../components/sparePartList"
import { useEffect } from "react"
import { ISparePart } from "../types/sparePart"
import { Loader } from "../components/common/loader"
import { Sidebar } from "../components/sidebar"
import { usePartList } from "../hooks/usePartList"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { partListSelectors } from "../store/selectors"
import { useCategoryData } from "../hooks/useCategoryData"
import { BreadCrumbs } from "../components/breadScrumb"
import Helmet from "react-helmet"

interface ICategoryPageProps{
    pageTitle: string,
    categoryData: string
}


const CategoryPage:React.FC<ICategoryPageProps> = ({pageTitle, categoryData})=>{
    useCategoryData(categoryData)

    const {renderListSelector, loaderSelector} = partListSelectors
    const renderList: ISparePart[] = useTypedSelector(renderListSelector)
    const fetching = useTypedSelector(loaderSelector)

    const {onScrollEnd} = usePartList()
    const addNewParts = ()=>{
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if(scrollTop + clientHeight +10 >= scrollHeight){
            onScrollEnd()
            console.log("scroll end")
        }
    }

    useEffect(()=>{
        document.addEventListener('scroll', addNewParts)
        return ()=>{
            document.removeEventListener('scroll', addNewParts)
        }
    }, [])

    return (
    <div className="container page-container">
        <Helmet>
            <title> Автоцентр | {pageTitle} </title>
        </Helmet>
        <BreadCrumbs/>
        <h1 className="page-title"> {pageTitle}	</h1>
        <div className="flex-container">
            <Sidebar/>
            
            <div className = "spare-parts_container">
                {fetching? <Loader/> : 
                <>
                <SparePartList partList = {renderList}/>
                </>
                }
            </div>
        </div>
    </div>
    )
}

export {CategoryPage}