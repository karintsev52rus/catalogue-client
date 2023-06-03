
import { Link } from 'react-router-dom'

interface CategoryCardProps {
    categoryPath: string,
    categoryImage?: string,
    categoryTitle: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({categoryPath, categoryImage, categoryTitle})=>{

    return (
        <Link to = {categoryPath}>
        <div
        className='catalogue-category'
        style = {
            {backgroundImage: `url(${categoryImage})`}
        }
        >
            <div className='catalogue-category__title'>
                <span> {categoryTitle} </span>
            </div>
        </div>
        </Link>
        
    )
}

export {CategoryCard}