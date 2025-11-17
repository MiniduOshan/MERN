import React, { useEffect } from 'react'

function Product() {
  
        async function fetchProducts() {
         const data = await fetch("https://fakestoreapi.com/products")
         const products = await data.json()
            console.log(products)
      }
      useEffect(()=>{
            fetchProducts()
      }, [])
  
return (
    <div>
      <ul>
      {products.map(product=>{
        <li key={product.id}>{product.title}</li>))
      }
      </ul>
    </div>
  )
}

export default Product