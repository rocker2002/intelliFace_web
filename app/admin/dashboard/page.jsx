"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function dashboard(){
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
    useEffect(() => {
        console.log('Auth status:', isAuthenticated, 'Loading:', loading);
        if (!loading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Welcome to the dashboard!</h1>
            <p>Manage teachers, students and attendance here.</p>
            <p>Only visible if you're logged in.</p>
        </div>
    )
}