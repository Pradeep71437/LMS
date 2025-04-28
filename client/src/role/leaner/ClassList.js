import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Classroomlist from '../educator/Classroomlist'
import Navba from '../../Navba'
import DataContext from '../../Usecontactapi'
import Learnernav from './Learnernav'
import Assignment from './Assignment'
import ClassroomCourses from './ClassroomCourses'
import Feedback from './Feedback'

export default function ClassList({theme,settheme}) {
    const params=useParams()
    const[learnernav,setlearnernav]=useState("studyplan")
    console.log(params)
    const id= params.id
    const[classroom,setclassroom]=useState([])
    const{setcoornav,setplux}=useContext(DataContext)
    useEffect(()=>{
        setcoornav(false)
        setplux(false)
          axios({
              url:`http://localhost:4000/educator/classroom/get/${id}`,
              method:"GET", 
              headers:{"Content-Type":"application/json"}
      
            }).then((res)=>{
              setclassroom(res.data)
              console.log(res.data)
         
            }).catch((e)=>{
              console.log(e)
            })
      },[])

    const renderContent = () => {
        switch(learnernav) {
            case "studyplan":
                return <Classroomlist id={id} classroom={classroom} />;
            case "assignment":
                return <Assignment id={id} />;
            case "courses":
                return <ClassroomCourses id={id} />;
            case "feedback":
                return <Feedback classroomId={id} />;
            default:
                return <Classroomlist id={id} classroom={classroom} />;
        }
    }

    return (
        <div>
            <Navba theme={theme} settheme={settheme}/>
            {renderContent()}
            <Learnernav setlearnernav={setlearnernav} learnernav={learnernav} />
        </div>
    )
}
