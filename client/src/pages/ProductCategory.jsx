import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'

const ProductCategory = () => {

    const { products } = useAppContext()
    const {category} = useParams()

    const searchCategory = categories.find((item)=> item.path.toLowerCase() === category)

    const filteredProducts = products.filter((product)=> product.category.toLowerCase() === category)
  return (
    <div>
       {searchCategory && (
        <div>
            <p>{searchCategory.text.toUpperCase()}</p>
        </div>
       )}
    </div>
  )
}

export default ProductCategory