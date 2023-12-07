
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [person,setPerson]=useState([])
  const [val,setVal]=useState({
    name:"",
    number:""
  });

  const GetData=(e)=>{
    setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(val);
  }

  const register=async()=>{
    const res=await axios.post("http://localhost:3082/api/addtask",{...val})
    console.log(res.data);
    if(res.status!=404){
      alert("data added")
    }
    GetPerson()
  }

  const GetPerson=async ()=>{
    const res=await axios.get("http://localhost:3082/api/gettask")
    setPerson(res.data)
   
  }
useEffect(()=>{
  GetPerson()
},[])

 

  return (
    <>
      <div className="main-card">
        <h2>Phone Book</h2>
        <div><input type="text" placeholder='Name' name='name' onChange={GetData} /></div>
        <div><input type="text" placeholder='Number' name='number' onChange={GetData} /></div>
        <div><button onClick={register}>Register</button></div>

       
      </div>
     <div className="full-data">
     {
          person.map((dt,index)=>
          <div className="card" key={index}>
          <div className="card-details">
            <p className="text-title">{dt.name}</p>
            <p className="text-body">{dt.number}</p>
            <div className="btns">
              <button>DELETE</button>
              <button>EDIT</button>
            </div>
          </div>
          <button className="card-button">More info</button>
        </div>
          )
        }
     </div>
    </>
  )
}

export default App
