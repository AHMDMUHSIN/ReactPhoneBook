import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
        const res = await axios.delete(`http://localhost:3041/api/delTask/${id}`);
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
        <h2>Phone Book</h2>
        <div><input type="text" placeholder='Name' name='name' onChange={GetData} /></div>
        <div><input type="text" placeholder='Number' name='number' onChange={GetData} /></div>
        <div><button onClick={register}>Register</button></div>
      </div>
      <div className="full-data">
        {
        person.map((dt, index) => (
          <div className="card" key={index}>
            <div className="card-details">
              <p className="text-title">{dt.name}</p>
              <p className="text-body">{dt.number}</p>
              <div className="btns">
                <button onClick={() => delTask(dt._id)}>DELETE</button>
                <Link to='/edit'><button>EDIT</button></Link>
              </div>
            </div>
            <button className="card-button">More info</button>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default First;
