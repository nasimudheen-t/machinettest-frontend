import commonAPI from "./commonApi"
import serverURL from "./serverUrl"


export const getAllProduct = async()=>{
    return await commonAPI ("GET",`${serverURL}/all-products`,)
}


export const addProducts = async(reqbody)=>{
    return await commonAPI ("POST",`${serverURL}/add`,reqbody)
}


export const updateproducts = async(id,reqbody)=>{
    return await commonAPI ("PUT",`${serverURL}/edit/${id}`,reqbody)
}


export const deleteproducts = async(id)=>{
    return await commonAPI ("DELETE",`${serverURL}/delete-products/${id}`,{})
}

