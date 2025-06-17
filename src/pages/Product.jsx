import React, { useEffect, useState } from 'react'
import { addProducts, deleteproducts, getAllProduct, updateproducts } from '../service/allApi';
import { Link, Route, Routes } from 'react-router-dom';
import { orderbyCategory, salesperMonth } from '../../mock';
import { Bar, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Products = () => {
    const [order,setOrders] = useState()
    const [sales,setSales] = useState()
    const [selected,setSelected] = useState()
    const[edit,setEdite] = useState()
    const[modal,setModal] = useState(false)
  const [add,setAdd] = useState({
    name:'',category:'',price:'',inStock:''
  })
  console.log(add);
  
  const [products,setProducts] = useState([])
  console.log('all products',products);
  
  useEffect(()=>{
    getAllProducts(),
    setOrders(orderbyCategory),
    setSales(salesperMonth)
  
  }, [])

//   add product
  const addProducttoList = async()=>{
      const {name,category,price,inStock} = add
      console.log(name,category,price,inStock);
    try{
        if(name,category,price,inStock){
             const res = await addProducts(add)
              alert("item Added ...")
     console.log(res);
     window.location.reload()
     }else{
            alert("complete the form!!!")
        }
    
     
    }catch(err){
      console.log(err);
      
    }
  }

// get all product
  const getAllProducts = async()=>{
    try{
     const resonse = await getAllProduct()
     setProducts(resonse.data)
     console.log(resonse.data);
     
    }catch(err){
      console.log(err);
      
    }
  }
// delete product
 const deleteProductsById = async(id)=>{
  try{
    const res =  await deleteproducts(id)
     if(res.status === 200){
      alert('data deleted')
      getAllProduct()
      window.location.reload()
     }
  }catch(err){
    console.log(err);
    
    }
 }
//  edit product

const editProducts = async(id,updatedDAta)=>{
    try{
  const res = await updateproducts(id,updatedDAta)
        if(res.status===200){
            console.log("Product Updated",res);
            alert('Product Updated')
            getAllProduct()
            
        }
    }catch(err){
        console.log(err);
        
    }
}



  return (
   <>
  
<div className='products min-h-screen flex items-center justify-center bg-grey-100 px-4'>
  


<form action="" className='p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md'>
      <h1 className='text-2xl sm:text-3xl text-center mb-5 text-grey-700'>ADD PRODUCTS</h1>
    <div className=' flex flex-col gap-4'>
          <label htmlFor="">products Name</label>
  <input type="text" name="" id="" onChange={e=>setAdd({...add,name:e.target.value})}
  className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">Stock Availability</label>
  <input type="drop-down" name="" id=""  onChange={e=>setAdd({...add,inStock:e.target.value})} 
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
   <label htmlFor="">products price</label>
  <input type="number" name="" id=""  onChange={e=>setAdd({...add,price:e.target.value})}
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">category</label>
 <select name="" id="cars" onChange={e=>setAdd({...add,category:e.target.value})}
     className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200 flex justify-around' >
  <option value="select">select</option>
   <option value="sports">sports</option>
  <option value="music">music</option>
  <option value="mobile">mobile</option>
    <option value="stationary">stationary</option>
    <option value="Furniture">Furniture</option>
    <option value="Fitness">Fitness</option>

</select>
    </div>
</form>
    

    <button  onClick={addProducttoList} className='btn border border-grey-700 hover:bg-blue-800 hover:text-white'>Submit</button>
   
  </div>  


<h1 className='text-center text-2xl'>ALL PRODUCTS</h1>
  <div className='overflow-x-auto p-4 sm:w-full'>
   <table class="min-w-full  border  border-gray-300 text-sm text-left">
  <thead className='bg-purple-200 text-gray-1000 uppercase px-3 py-3'>
    <tr>
      <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>ProductName</th>
      <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>category</th>
      <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>price</th>
      <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>instock</th>
      <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>edit</th>
       <th className='px-4 py-2 border sm:px-4 w-24 sm:w-auto'>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
      products && products.map((items,index)=>(
         <tr key={index} >
      <td className='hover:bg-yellow-200 '>{items.name}</td>
      <td className='hover:bg-yellow-200'>{items.category}</td>
      <td className='hover:bg-yellow-200'>{items.price}</td>
      <td className={`hover:bg-yellow-200 ${items.inStock?'bg-green-700 text-white':'bg-red-700'}`}>{items.inStock?'in Stock':'Out of stock'}</td>
      <td className='hover:bg-yellow-200 '><button onClick={()=>{
        setEdite(items),
        setModal(true)
      }
      }className='bg-green-600 border rounded px-4 py-2 w-full' >Edit</button></td>
     <td className='hover:bg-yellow-200'> <button className='bg-red-600 border rounded px-4 py-2 w-full' onClick={()=>deleteProductsById(items._id)}>Delete</button></td>
    </tr>
      ))
   }
   

  
  </tbody>
</table>


{/* modal for dit data */}
{
    modal &&(
        <div>
  <button className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10">Open dialog</button>

  <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
   
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        

        {/* Edit Products */}
     <div className='min-h-screen flex items-center justify-center  px-4'>
       <form action="" className='p-6 sm:p-8 rounded-2xl shadow-lg w-full bg-white max-w-md'>

      <h1 className='text-2xl sm:text-3xl text-center mb-5 text-grey-700'>EDIT PRODUCTS</h1>
    <div className=' flex flex-col gap-4'>
          <label htmlFor="">products Name</label>
  <input type="text" name="" id="" onChange={e=>setEdite({...edit,name:e.target.value})}
  value={edit.name}
  className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">Stock Availability</label>
  <input
  
  type="drop-down" name="" id=""  onChange={e=>setEdite({...edit,inStock:e.target.value})} 
  value={edit.inStock}
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
   <label htmlFor="">products price</label>
  <input type="number" name="" id="" 
  value={edit.price}
  onChange={e=>setEdite({...edit,price:e.target.value})}
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">category</label>
 <select name="" id="cars"
 
    
 onChange={e=>setEdite({...edit,category:e.target.value})}
     className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200 flex justify-around' >
  <option value={edit.category}>{edit.category}</option>
   <option value="sports">sports</option>
  <option value="music">music</option>
  <option value="mobile">mobile</option>
    <option value="stationary">stationary</option>
    <option value="Furniture">Furniture</option>
    <option value="Fitness">Fitness</option>

</select>
    </div>  
    <div className='flex justify-around mt-5 px-4 py-2 '>
         <button onClick={()=>setModal(false)} className='bg-red-600 px-5 py-1 border rounded'>Cancel</button>
    <button onClick={()=>editProducts(edit._id,edit)} className='bg-green-600 px-5 py-1 border rounded'>Submit</button>
    </div>
</form>
     </div>
      </div>
    </div>
  </div>
</div>
    )
}
  </div>


<div>
 
</div>

{/* sorting */}
{/*  */}
<h2 className='text-center mt-5 text-2xl'>PRODUCT SORTING</h2>
<div className='flex items-end justify-end mr-5 w-100'>
     <label htmlFor="" className='mr-2 mb-3'>category: </label>
 <select name="" id="cars"
 value={selected}
 onChange={(e)=>setSelected(e.target.value)}
     className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200 flex justify-around' >
  <option value="select">select</option>
   <option value="sports">sports</option>
  <option value="music">music</option>
  <option value="mobile">mobile</option>
    <option value="stationary">stationary</option>
    <option value="Furniture">Furniture</option>
    <option value="Fitness">Fitness</option>

</select>
</div>
  <div className='overflow-x-auto p-4'>
   <table class="min-w-[700] w-full border  border-gray-300 text-sm text-left">
  <thead className='bg-purple-200 text-gray-1000 uppercase px-3 py-3'>
    <tr>
      <th className='px-4 py-2 border'>ProductName</th>
      <th className='px-4 py-2 border'>category</th>
      <th className='px-4 py-2 border'>price</th>
      <th className='px-4 py-2 border'>instock</th>
      <th className='px-4 py-2 border'>edit</th>
       <th className='px-4 py-2 border'>Delete</th>
    </tr>
  </thead>
  <tbody>
   {
      products && products.filter(items=>items.category===selected).map((items,index)=>(
           <tr key={index} >
      <td className='hover:bg-yellow-200'>{items.name}</td>
      <td className='hover:bg-yellow-200'>{items.category}</td>
      <td className='hover:bg-yellow-200'>{items.price}</td>
      <td className={`hover:bg-yellow-200 ${items.inStock?'bg-green-700 text-white':'bg-red-700'}`}>{items.inStock?'in Stock':'Out of stock'}</td>
      <td className='hover:bg-yellow-200 '><button onClick={()=>{
        setEdite(items),
        setModal(true)
      }
      }className='bg-green-600 border rounded px-4 py-2 w-full' >Edit</button></td>
     <td className='hover:bg-yellow-200'> <button className='bg-red-600 border rounded px-4 py-2 w-full' onClick={()=>deleteProductsById(items._id)}>Delete</button></td>
    </tr>

      ))
      
   }
   

  
  </tbody>
</table>


{/* modal for edit data */}
{
    modal &&(
        <div>
  <button className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10">Open dialog</button>

  <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
   
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        

        {/* Edit Products */}
     <div className='min-h-screen flex items-center justify-center  px-4'>
       <form action="" className='p-6 sm:p-8 rounded-2xl shadow-lg w-full bg-white max-w-md'>

      <h1 className='text-2xl sm:text-3xl text-center mb-5 text-grey-700'>EDIT PRODUCTS</h1>
    <div className=' flex flex-col gap-4'>
          <label htmlFor="">products Name</label>
  <input type="text" name="" id="" onChange={e=>setEdite({...edit,name:e.target.value})}
  value={edit.name}
  className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">Stock Availability</label>
  <input
  
  type="drop-down" name="" id=""  onChange={e=>setEdite({...edit,inStock:e.target.value})} 
  value={edit.inStock}
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
   <label htmlFor="">products price</label>
  <input type="number" name="" id="" 
  value={edit.price}
  onChange={e=>setEdite({...edit,price:e.target.value})}
   className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200'/>
  <label htmlFor="">category</label>
 <select name="" id="cars"
 
    
 onChange={e=>setEdite({...edit,category:e.target.value})}
     className='px-4 py-2 border border-black-800 rounded-md focus:ouitline-none focus:ring-blue-200 flex justify-around' >
  <option value={edit.category}>{edit.category}</option>
   <option value="sports">sports</option>
  <option value="music">music</option>
  <option value="mobile">mobile</option>
    <option value="stationary">stationary</option>
    <option value="Furniture">Furniture</option>
    <option value="Fitness">Fitness</option>

</select>
    </div>  
    <div className='flex justify-around mt-5 px-4 py-2 '>
         <button onClick={()=>setModal(false)} className='bg-red-600 px-5 py-1 border rounded'>Cancel</button>
    <button onClick={()=>editProducts(edit._id,edit)} className='bg-green-600 px-5 py-1 border rounded'>Submit</button>
    </div>
</form>
     </div>
      </div>
    </div>
  </div>
</div>
    )
}
  </div>


{/* chart  */}
  <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
   {/* orders per product */}
    <div className='p-4 bg-white shadow-md rounded'>
     <h2 className='text-center'>ORDERS PER CATEGORY</h2>
      <LineChart width={400} height={400} data={order} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
  <XAxis dataKey="category" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="orders" stroke="#ff7300" yAxisId={0} />

</LineChart>
{/* sales per month */}
    </div>

     <div className=' p-4 bg-white shadow-md rounded'>
     <h2 className='text-center'>TOTAL SALES PER MONTH</h2>
   <h1></h1>
   <LineChart width={400} height={400} data={sales} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
  <XAxis dataKey="month" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  
  <Line type="monotone" dataKey="sales" stroke="#ff7300" yAxisId={0} />  

</LineChart>
    </div>
  </div>
   </>
  )
}

export default Products