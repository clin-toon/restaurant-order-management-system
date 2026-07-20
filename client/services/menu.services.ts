import {   SearchParamsShape } from "@/types/MenuPageTypes";

const url = process.env.NEXT_PUBLIC_API

export const fetchMenuItems = async () =>{
    
    try {
        const res = await fetch(`${url}food`) ;
        const data = await res.json() ;
        console.log(data)
        return data.data
    
    } catch (error) {
        console.log(error)
    }   

}


export const  getMenuDataWithFilters = async (params: SearchParamsShape) => {
  const query = new URLSearchParams(params as any).toString();
  try {
         const res = await fetch(`${url}search?${query}`)
         const data = await res.json();
        const obj = {
          totalPages:data.count,
          data:data.data
        }
       
        return obj;
  } catch (error) {
    console.log(error)
  }

}