'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const TeacherContext = createContext();

export function TeacherProvider({ children }) {
  const [teachers, setTeachers] = useState([]);

  // Load from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem('teachers');
    if (stored) {
      setTeachers(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever teachers change
  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addTeacher = (teacher) => {
    setTeachers((prev) => [...prev, teacher]);
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
}
