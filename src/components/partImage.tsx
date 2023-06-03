import { useEffect, useState, useRef } from "react"
import { getImage } from "../actions/dataActions"
import Placeholder  from "../assets/img/catalogue/gear-solid.svg"

type PartImageProps = {
    partNumber: string
    
}

const PartImage: React.FC<PartImageProps> = ({partNumber})=>{
    const [imageUrl, setImageUrl] = useState(Placeholder)
    const [imageClass, setImageClass] = useState("placeholder_image")
    const imageRef = useRef(null)
    const [modalImage, setModalImage] = useState(false)

    useEffect(()=>{
        getImage(partNumber)
        .then((url)=>{
            if(url){
                setImageUrl(url)
                setImageClass("spare-part_image")
            }
            else{
                setImageUrl(Placeholder)
                setImageClass("placeholder_image")
            }
        })
    }, [partNumber])

    return(
    <>
        <img
            ref = {imageRef}
            src={imageUrl} alt="part image" 
            className={imageClass}
            onLoad={()=>{
                imageRef.current.width > imageRef.current.height ?
                imageRef.current.classList.add("horizontal-image") : 
                imageRef.current.classList.add("vertical-image")
            }}
            onClick = {()=>{
                if (imageClass !== "placeholder_image"){
                    setModalImage(!modalImage)
                }
                
            }}
        />
        { modalImage && imageClass !== "placeholder_image" ? 
        <div className="modal-image-container"
        onClick={()=>{
            setModalImage(!modalImage)
        }}
        >
            <img src= {imageUrl} alt="part image" className="modal-image"/>
        </div> :
        null
        }
    </>
            
    )
}

export {PartImage}