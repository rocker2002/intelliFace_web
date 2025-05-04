"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = (e)=>{
        e.preventDefault();


        login("rockermoizz@gmail.com", "moizz123");
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )

    
}