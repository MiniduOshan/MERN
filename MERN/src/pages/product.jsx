import React, { useEffect } from 'react'

function Product() {
     
      const [products, setProducts] = React.useState([])

        async function fetchProducts() {
         const data = await fetch("https://fakestoreapi.com/products")
         const products = await data.json()
        setProducts(products)
        console.log(products)
      }
      useEffect(()=>{
            fetchProducts()
      }, [])
  
return (
    <div className="min-h-screen bg-gray-100 p-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Products
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
      <ul>
      {products.map(product=>(
        
        <li key={product.id}>{product.title}</li>))
      }
      </ul>
    </div>
  )
}

export default Product