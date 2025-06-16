import React, { useEffect, useState } from 'react'
import { addProducts, deleteproducts, getAllProduct } from './service/allApi';
import { Link, Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit';

const App = () => {

  // <Routes>
  //   <Route path={'/edit'} element={<Edit/>}/>
  // </Routes>

  const [add,setAdd] = useState({
    name:'',category:'',price:'',inStock:''
  })
  console.log(add);
  
  const [products,setProducts] = useState([])
  console.log('all products',products);
  
  useEffect(()=>{
    getAllProducts()
  }, [])

  
  const addProducttoList = async()=>{
      const {name,category,price,inStock} = add
      console.log(name,category,price,inStock);
    try{
     const res = await addProducts(add)
     console.log(res);
     
    }catch(err){
      console.log(err);
      
    }
  }


  const getAllProducts = async()=>{
    try{
     const resonse = await getAllProduct()
     setProducts(resonse.data)
     console.log(resonse.data);
     
    }catch(err){
      console.log(err);
      
    }
  }

 const deleteProductsById = async(id)=>{
  try{
    const res =  await deleteproducts(id)
     if(res.status === 200){
      alert('data deleted')
      getAllProduct()
     }
  }catch(err){
    console.log(err);
    
    }
 }
  return (
   <>
  
<div className='products'>
  
  <h1>ADD PRODUCTS</h1>

  <label htmlFor="">products Name</label>
  <input type="text" name="" id="" onChange={e=>setAdd({...add,name:e.target.value})}/>
  <label htmlFor="">Stock Availability</label>
  <input type="drop-down" name="" id=""  onChange={e=>setAdd({...add,inStock:e.target.value})} />
   <label htmlFor="">products price</label>
  <input type="number" name="" id=""  onChange={e=>setAdd({...add,price:e.target.value})}/>
  <label htmlFor="">category</label>
 <select name="cars" id="cars" onChange={e=>setAdd({...add,category:e.target.value})}>
  <option value="volvo">sports</option>
  <option value="saab">music</option>
  <option value="mercedes">mobile</option>

</select>
    

    <button onClick={addProducttoList} className='btn'>Submit</button>
   
  </div>  


  <div className='table'>
   <table class="table-auto">
  <thead>
    <tr>
      <th className='bg-yellow'>ProductName</th>
      <th>category</th>
      <th>price</th>
      <th>instock</th>
      <th>edit</th>
    </tr>
  </thead>
  <tbody>
   {
      products && products.map((items)=>(
         <tr >
      <td>{items.name}</td>
      <td>{items.category}</td>
      <td>{items.price}</td>
      <td>{items.inStock}</td>
      <td><Link to={'/edit'} >edit</Link></td>
      <button onClick={deleteProductsById}>Delete</button>
    </tr>
      ))
   }
   
  
  </tbody>
</table>
  </div>


<div>
 
</div>

   </>
  )
}

export default App