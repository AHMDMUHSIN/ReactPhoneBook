import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate=useNavigate()
  const {id}=useParams()
  // const [getPersondetails,setPersondetails]=useState({})
  // const [person, setPerson] = useState({});
  const [val, setVal] = useState({
    name: '',
    number: ''
  });

  const GetPerson = async () => {
    try {
      const res = await axios.post(`http://localhost:3082/api/fulltails/${id}`);
      setVal(res.data);
      console.log(val);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

 

  const Edit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.patch(`http://localhost:3082/api/edittask/${id}`, { ...val });
      console.log(res.data);
      if (res.status !== 404) {
        navigate("/")
        alert("data edited");
        
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const GetData = (e) => {
    setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(val);
  };

  

  useEffect(() => {
    GetPerson();
  }, []);

  return (
    <div>
<form action="" onSubmit={Edit}>
<div className="main-card">
        <h2>Edit Phone Book</h2>
        <div><input type="text" placeholder='Name' name='name' value={val.name} onChange={GetData}/></div>
        <div><input type="text" placeholder='Number' name='number' value={val.number} onChange={GetData}/></div>
        <div><button>Edit</button></div>

       
      </div>
</form>
    </div>
  )
}

export default Edit
