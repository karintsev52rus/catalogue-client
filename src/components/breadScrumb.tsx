import { useLocation, useMatches, Link } from "react-router-dom"
import { routesData } from "../routes/routes"


const BreadCrumbs = ()=>{
    const matches = useMatches()
    const location = useLocation()

    const getCrumbTitle = (pathname: string): string | null=>{
        switch (pathname) {
            case location.pathname:
                return null
            case routesData.jac.pathname:
                return routesData.jac.title
            case routesData.usa.pathname:
                return routesData.usa.title
            case routesData.europe.pathname:
                return routesData.europe.title
            case routesData.root.pathname:
                return routesData.root.title
            default:
                return null;
        }
    }

    const titles = matches.filter((match)=>{
        const title = getCrumbTitle(match.pathname)
        return title !== null
    })

    return (
        <ul className="breadcrumbs">
            {titles.map((t, index)=>{
                return (
                    <li key= {`${index}${t.pathname}`} className="breadcrumb">
                        <Link
                            key = {index} 
                            to={t.pathname} 
                            > 
                            {getCrumbTitle(t.pathname)}
                        </Link>
                        {
                            index !== titles.length - 1 ? 
                            <div  className="arrow">
                            {">"}
                            </div>:
                            null
                        }
                    </li>
                )
            })}
        </ul>
    )
}   

export {BreadCrumbs}