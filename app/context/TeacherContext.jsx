"use client";
import api from '../utils/axios';
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const TeacherContext = createContext();

export function TeacherProvider({ children }) {
  const [teachers, setTeachers] = useState([]);
const fetchTeachers = useCallback(async () => {
  try {
    console.log("[DEBUG] Fetching teachers from API...");
    const response = await api.get("/teacher");
    console.log("[DEBUG] API Response:", response.data);

    let teachersData = [];
    
    if (response.data && Array.isArray(response.data.result)) {
      teachersData = response.data.result;
    } else if (Array.isArray(response.data)) {
      teachersData = response.data;
    } else {
      console.error("[ERROR] Unexpected API structure:", response.data);
      throw new Error("API returned unexpected data structure");
    }

    console.log("[DEBUG] Extracted teachers:", teachersData);
    setTeachers(teachersData);
    return { success: true, count: response.data.count };
  } catch (error) {
    console.error("[ERROR] Fetch teachers failed:", {
      error: error.message,
      response: error.response?.data,
    });
    setTeachers([]);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}, []);

  const addTeacher = useCallback(async (teacherData) => {
    try {
      const response = await api.post("/teacher", teacherData);
      const newTeacher = response.data;
      setTeachers(prev => [...prev, newTeacher]);
      return { success: true };
    } catch (error) {
      console.error("Error adding teacher:", error.response?.data || error.message);
      return { success: false, error: error.response?.data };
    }
  }, []);

const updateTeacher = useCallback(async (teacherId, updatedData) => {
  try {
    const response = await api.patch(`/teacher/${teacherId}`, updatedData);
    const updatedTeacher = response.data;
    
    setTeachers(prev => 
      prev.map(teacher => 
        teacher.id === teacherId ? updatedTeacher : teacher
      )
    );
    
    return { success: true, teacher: updatedTeacher };
  } catch (error) {
    console.error("Update error:", error);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}, []);

  return (
    <TeacherContext.Provider value={{ 
      teachers, 
      fetchTeachers, 
      addTeacher, 
      updateTeacher
    }}>
      {children}
    </TeacherContext.Provider>
  );
}

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
}