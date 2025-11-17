import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import Form from './pages/form.jsx'
import Product from './pages/product.jsx' 

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Header />

      <main className="flex-1">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/product' element={<Product />} />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App