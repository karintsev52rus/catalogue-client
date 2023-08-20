import { useEffect, useState, useRef } from "react"
import { getImage } from "../actions/dataActions"
import Placeholder  from "../assets/img/catalogue/gear-solid.svg"
import { Loader } from "./common/loader"

type PartImageProps = {
    partNumber: string
    
}

const PartImage: React.FC<PartImageProps> = ({partNumber})=>{
    const [imageUrl, setImageUrl] = useState(Placeholder)
    const [imageClass, setImageClass] = useState("placeholder_image")
    const imageRef = useRef(null)
    const modalImageRef = useRef(null)
    const [modalImage, setModalImage] = useState(false)
    const [loading, setLoading] = useState(true)

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
                setLoading(false)
            }
        })
    }, [partNumber])

    const partImage = imageClass === "spare-part_image" ? 
    <img
        ref = {imageRef}
        src={imageUrl} 
        alt="part image" 
        className={imageClass}
        style={{visibility: "hidden"}}
        onLoad={()=>{
            imageRef.current.width > imageRef.current.height ?
            imageRef.current.classList.add("horizontal-image") : 
            imageRef.current.classList.add("vertical-image");
            imageRef.current.style.visibility = "visible"
            setLoading(false)
        }}
        onClick = {()=>{
            setModalImage(!modalImage)
        }}
        />
    :
    <img src={imageUrl}
    className={imageClass}
    alt="placeholder_image" />

    const loader = Loader

    return(
        <>  <div className="loader-container">
                {loading? <Loader/>: null}
            </div>
            
            {partImage}
            { modalImage && imageClass !== "placeholder_image" ? 
            
            <div className="modal-image-container" 
            onClick={()=>{
                setModalImage(!modalImage)
            }}
            >
                <img 
                ref = {modalImageRef} 
                src= {imageUrl} 
                alt="part image" 
                className="modal-image"
                onLoad={()=>{
                    modalImageRef.current.width > modalImageRef.current.height ?
                    modalImageRef.current.classList.add("modal-image-horizontal") : 
                    modalImageRef.current.classList.add("modal-image-vertical")
                }}
                />
            </div> :
            null
            }
        </>
                
        )
    

    
}

export {PartImage}