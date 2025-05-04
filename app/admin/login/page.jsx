"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const dummyMail = "rockermoizz@gmail.com";
        const dummyPassword = "moizz123";

        if(email === dummyMail && password === dummyPassword){
            alert("Login Successful!");
            setError("");
            router.push("dashboard");
        }else{
            setError("Invalid email or password");
            console.log(error)
        }
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