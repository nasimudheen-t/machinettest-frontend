import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Product'
import Edit from './pages/Edit'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Products/>}/>
         <Route path='/edit' element={<Edit/>}/>
    </Routes>
    </>
  )
}

export default App