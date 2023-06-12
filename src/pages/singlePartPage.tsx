import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPart } from "../actions/dataActions"
import { PartImage } from "../components/partImage"
import { Loader } from "../components/common/loader"
import { BreadCrumbs } from "../components/breadScrumb"



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
            <BreadCrumbs/>
            {!fetching ? <h1 className="page-title"> { error? partNumber : partInfo.title } </h1> : null} 
        <div className="flex-container single-page_container">
            <div className="single-page_image_container">
                <PartImage partNumber = {partNumber} />
            </div>
            {!fetching ? 
            <div className="part-info">
                {/* <div className="spare-part_brand spare-part_prop">
                    <span className = "spare-part_prop_name"> бренд:</span  ><span className = "spare-part_prop_value">{partInfo.brand}</span>
                </div> */}
                <div className="spare-part_price spare-part_prop">
                    <span className = "spare-part_prop_name"> цена: </span> <span className = "spare-part_prop_value" > {partInfo.price}  Р</span>
                </div>
                <div className="spare-part_available spare-part_prop">
                {partInfo.quantity > 0 ? <span className = "spare-part_prop_value in-stock" > В наличии </span> :
                        <span className = "spare-part_prop_value out-stock" > Под заказ </span>
                    }
                </div>
            </div>
            :
            <Loader/>
        }
        </div>
        <div className="contact-info">
            По вопросам приобретения запчастей обращайтесь по следующим телефонам:
            <br/>
            89036046426
        </div>
        </div>
    ) 
}

export {SinglePartPage}