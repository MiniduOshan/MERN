import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="flex gap-8 p-4 bg-gray-200 justify-end text-xl px-5">
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      <Link to="/product">Product</Link>
    </div>
  )
}

export default Header