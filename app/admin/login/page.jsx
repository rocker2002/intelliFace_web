"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import api from '../../utils/axios';

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await api.post('/login', { email, password });
        const { access, refresh } = response.data;
    
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    
        console.log('Login successful!');
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        setError("Invalid email or password");
      }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 space-y-6">
       
        <div className="flex justify-center">
          <img
            src="/image.png" 
            alt="Logo"
            className="h-24 w-24"
          />
        </div>

       
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Welcome Back!</h1>
          <p className="text-gray-500">Enter credentials to login</p>
        </div>

       
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm">
            <a href="#" className="text-gray-500 hover:underline">
              forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}

        </form>

        
        <p className="text-center text-sm text-black">
          Don’t have an account?{" "}
          <a href="#" className="font-bold hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
    )

    
}