import React, { useContext, useEffect } from 'react'
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DataContext from '../../Usecontactapi';
import page1 from "../../Pictures/pag2.jpg"
import Studyplan from './Studyplan';

export default function Classroomlist({classroom,id}) {
const{addcourse,setaddcourse,classstudenthides,setclassstudenthides,setplux,plux}=useContext(DataContext)

    useEffect(()=>{
        setaddcourse([])
        setclassstudenthides(false)
    },[])
    const navigate=useNavigate()
function createstudyfn(){
navigate(`/educator/classroom/studyplan/${id}`)
}
  return (
    <div className=''>
    <div className='p-4' style={{backgroundImage:`url(${page1})`,backgroundSize:"cover",backgroundPosition:"full"}}>
                <h3 className='text-3xl text-white'>CLASS : {(classroom.classname)}</h3>
                <h5 id='spam' className='text-white'>BATCH : {(classroom.batch)}</h5>
      </div>
      <Studyplan id={id} />
     {plux==true?<IoAddCircleSharp  onClick={createstudyfn} className='plux'/> : null} 
            </div>
  )

}
