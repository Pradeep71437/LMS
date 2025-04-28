import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export default function Assignment({id}) {
    const[assignment,setassignment]=useState([])
    const[expired,setexpired]=useState("")
    const[userid,setuserid]=useState(JSON.parse(localStorage.getItem("learning-token")))
    useEffect(()=>{
      console.log(userid)
        axios({
          url:`http://localhost:4000/educator/classroom/assignment/get/${id}`,
          method:"GET", 
    
          headers:{"Content-Type":"application/json"}
    
        }).then((res)=>{
          console.log(res.data)
          setassignment(res.data.assignment)
          setexpired(res.data.duodate)
        }).catch((e)=>{
          console.log(e)
        })
      },[])
      
      function onchangefn(e){
        var {name,value} = e.target
        
        // console.log(error)
        // seterror({...error,[name]:value})
    
      }
  return (
  
       <div className=' bg-gray-100 p-6 rounded-lg shadow-lg'>
       <h2 className='text-center text-xl font-bold text-blue-600 mb-8  p-4 rounded-lg shadow-md'>ASSIGNMENT</h2>
      {assignment.length>0 ? assignment.map((res)=>{
        return <div className=' bg-white p-5 rounded-lg shadow-md mb-6 hover:shadow-xl transition-shadow duration-300' id='assignment' key={res._id}>
        <h2 className='text-center text-xl font-semibold text-gray-800 mb-4'><span className='span text-blue-600'>SUBJECT : </span>{(res.subject).toUpperCase()}</h2>
          <div className='flex justify-between items-center w-full bg-gray-50 p-4 rounded-lg mb-4'>
          <p className='text-gray-700'><span className='span text-blue-600'>TITLE : </span>{(res.topic).toUpperCase()}</p>
          <div>
          <p className='text-gray-700'><span className='span text-blue-600'>CREATED AT : </span>{(res.createdAt).toUpperCase()}</p>
          <p className='span text-green-600 font-bold'>MARK :{res.marks}<span></span></p>

          </div>
          </div>
       
        <p className=' text-gray-700 mb-4'><span className='span text-blue-600'>DESCRIPTION : </span>{res.description}</p>
        {expired==""?null:<p className='span text-red-600 font-bold'>DATE OVER</p>}
        {/* <p className='span text-green-600 font-bold'>MARK :{res.marks}/<span></span></p> */}
          <form action="http://localhost:4000/leaner/assignment/upload" className=' mt-6 p-4 bg-gray-100 rounded-lg' method="post" enctype="multipart/form-data" > 
         <p className='text-gray-700 font-medium '>UPLOAD ASSIGNMENT</p>
        <input type='text' style={{marginLeft:"-99999",display:"none"}}  name='id' value={res._id} onChange={(e)=>onchangefn(e)}/><br></br>
        <input type='text' style={{marginLeft:"-99999",display:"none"}} name='token' value={userid.token} onChange={(e)=>onchangefn(e)}/><br></br>
        <input type='file' className='uploadassignment mb-4'  accept='image/png, image/jpeg' id='image' name='image' ></input><br></br>
        <div className='flex justify-center items-center'>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200' type='submit'>Submit</button>
        </div>
       </form>
      
   </div>
      }):<p className='empty text-gray-500 text-center text-xl'>No assignments</p>}
      </div>
  )
}
