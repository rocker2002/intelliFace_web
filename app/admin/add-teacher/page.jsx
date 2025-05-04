"use client";

import { useState } from "react";
import { useTeacher } from '../../context/TeacherContext';

export default function addTeacher(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [message, setMessage] = useState('');

    const { addTeacher } = useTeacher();


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!name || !email){
            setMessage("Please fill all fields");
            return;
        }

        addTeacher({ name, email });
        setMessage(`Teacher ${name} added successfully!`);

        setName('');
        setEmail('');

    };

    return(
        <div>
            <form action="" onSubmit= {handleSubmit}>
                <label htmlFor="">Teacher Name</label>
                <br />
                <input type="text" placeholder="Enter Name" value={name} onChange = {(e)=>setName(e.target.value)} />
                <br />
                <label htmlFor="">Email</label>
                <br />
                <input type="email" placeholder="Enter Email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                <br />
                <button type="submit">Add</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}