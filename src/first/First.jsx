import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './First.css'

const First = () => {
  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const [val, setVal] = useState({
    name: '',
    number: ''
  });

  const GetData = (e) => {
    setVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3082/api/addtask", { ...val });
      console.log(res.data);
      if (res.status !== 404) {
        alert("data added");
      }
      GetPerson();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const GetPerson = async () => {
    try {
      const res = await axios.get("http://localhost:3082/api/gettask");
      setPerson(res.data);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  useEffect(() => {
    GetPerson();
  }, []);

  const delTask = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this staff member?");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:3082/api/delTask/${id}`);
        console.log("deleted", res.data);
        GetPerson(); // Corrected from getAllstaff
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="main-card">
        <h2 className='head'>My todo-s</h2>
        <div className='main'>
        <div><input type="text" placeholder='Add Content...' name='name' onChange={GetData} /></div>
        <div><input type="date"  name='number' onChange={GetData} /></div>
        <div><button className='btn' onClick={register}>ADD</button></div>
        </div>
        
      </div>

      <div className='border'></div>
      <div className="full-data">
        {
        person.map((dt, index) => (
          <div key={index}>

            <div className='main2'>
              <div className='name'>{dt.name}</div>
              <div className='icons'>
               
                <div><span className='info'></span> {dt.number}</div>
                <Link className='editicon' to={`/edit/${dt._id}`}> <div ><MdOutlineEdit /></div></Link>
                <div className='deleteicon' onClick={() => delTask(dt._id)}><MdDelete /> </div>
              </div>
            </div>
            
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default First;
