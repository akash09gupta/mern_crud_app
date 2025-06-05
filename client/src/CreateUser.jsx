import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        axios.post(`${apiUrl}/createUser`,{name, email, age}) //axios.post(link, data)
        .then(response=>{
            console.log(`${apiUrl}`)
            console.log({ name, email, age }); 
            console.log("Done", response.data)
            navigate('/');
            
        })
        .catch(err=>console.log(err));
    }
    return(
        <>
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" 
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control" 
                        onChange={(e)=> setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateUser;