"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useStudent } from "@/app/context/StudentContext";

export default function StudentsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [message, setMessage] = useState("");
  const {students, addStudent} = useStudent();

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!name || !email || !studentClass) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const newStudent = { name, email, class: studentClass };
    addStudent(newStudent);
    setMessage(`✅ Student ${name} added successfully!`);

    setName("");
    setEmail("");
    setStudentClass("");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-black mb-6">Manage Students</h1>

      <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-xl">
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Student Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Class</label>
          <input
            type="text"
            placeholder="e.g., 10-A"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Add Student
        </button>

        {message && <p className="mt-4 text-sky-700 text-sm">{message}</p>}
      </form>

      
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
        <h2 className="text-lg font-semibold text-sky-800 mb-4">Registered Students</h2>
        {students.length === 0 ? (
          <p className="text-gray-500">No students registered yet.</p>
        ) : (
          <ul className="space-y-3">
            {students.map((student, index) => (
              <li
                key={index}
                className="border p-3 rounded-lg bg-sky-50 text-sky-800 flex justify-between items-center"
              >
                <div>
                  <strong>{student.name}</strong> – {student.class}
                  <div className="text-sm text-gray-600">{student.email}</div>
                </div>
                <button className="text-sm text-blue-500 hover:underline">
                  Update Face Data
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
