import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPart } from "../actions/dataActions"
import { PartImage } from "../components/partImage"
import { Loader } from "../components/common/loader"
import { BreadCrumbs } from "../components/breadScrumb"
import { CartModal } from "../components/cartModal"
import Helmet from "react-helmet"



const SinglePartPage:React.FC = ()=>{
    const {partNumber} = useParams()
    const decodedPartNumber = decodeURI(partNumber) 

    const [partInfo, setPartInfo] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)


    useEffect(()=>{
        getPart(decodedPartNumber)
        .then((data)=>{
            setPartInfo(data)
            setFetching(false)
        })
        .catch((err)=>{
            setError(true)
            console.log(err.message)
        })
    }, [partNumber])

    return (
        <div className="container page-container">
            <Helmet>
                <title> Автоцентр | {!fetching && !error ? partInfo.title : "" } </title>
            </Helmet>
            <BreadCrumbs/>
            {!fetching ? <h1 className="page-title"> { error? partNumber : partInfo.title } </h1> : null} 
        <div className="flex-container single-page_container">
            <div className="single-page_image_container">
                <PartImage partNumber = {partNumber} />
            </div>
            {!fetching ? 
            <div className="part-info">
                <div className="spare-part_brand spare-part_prop">
                    <span className = "spare-part_prop_name"> артикул:</span  ><span className = "spare-part_prop_value">{partInfo.partNumber}</span>
                </div>
                <div className="spare-part_price spare-part_prop">
                    <span className = "spare-part_prop_name"> цена: </span> <span className = "spare-part_prop_value" > {partInfo.price}  Р</span>
                </div>
                <div className="spare-part_available spare-part_prop">
                {partInfo.quantity > 0 ? <>
                    <span className = "spare-part_prop_value in-stock" > В наличии </span> 
                    <CartModal partInfo={partInfo}/>
                </> 
                
                :
                        <span className = "spare-part_prop_value out-stock" > Под заказ </span>
                    }
                </div>
            </div>
            :
            <Loader/>
        }
        </div>
        <div className="contact-info">
            По вопросам приобретения и подбора запчастей обращайтесь по следующим телефонам:
            <br/>
            <a href="tel:89036046426" className="">+7 903 604 64 26</a>
        </div>
        </div>
    ) 
}

export {SinglePartPage}