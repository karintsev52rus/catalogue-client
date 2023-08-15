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
            <p className="text">
            Добро пожаловать в каталог запчастей АвтоЦентр! Здесь вы сможете получить информацию о цене и наличии интересующих вас запчастей на нашем складе в Дзержинске.
            </p>
            <p className="text">
            В нашем каталоге на данный момент представлены запчасти для грузовых автомобилей JAC моделей N56, N75/N80/N90, N120, N200, N350, и наш ассортимент постоянно расширяется. Для поиска интересующих вас запчастей вы можете воспользоваться удобным каталогом с поиском по артикулу и наименованию, а так же с фильтрами по групам. 
            </p>
            
            
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
            
            <div className="parts-contacts" >
                <h3>Контакты</h3>
                <p className="text">
                Для заказа и подбора запчасти по VIN обращайтесь по телефону <a href="tel:89092939196">+7 909 293 91 96</a> или на почту jac-dzr@yandex.ru
                <br />
                Адрес склада: Дзержинск Автозаводское шоссе 81 корпус 6 
                </p>

                <div className="contacts-map" style={{height: "450px"}}>
                <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&um=constructor%3A56b504edc208361e170ce847100680b61a15303981059117f5ace5ae53c7fd98" width={"100%"} height={"100%"} style={{display: "block"}} ></iframe>
                </div>

            </div>
        </div>
    )
}

export {Catalogue}
