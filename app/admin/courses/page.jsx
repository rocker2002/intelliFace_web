"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useCourse } from "../../context/CourseContext";

export default function CoursesPage() {
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const {courses, addCourse} = useCourse();
  

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!courseCode.trim() || !courseTitle.trim() || !department.trim() || !semester.trim() || !description.trim()) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const newCourse = { courseCode, courseTitle, department, semester, description };
    addCourse(newCourse);
    setMessage(`✅ Course "${courseTitle}" added successfully!`);

    setCourseCode("");
    setCourseTitle("");
    setDepartment("");
    setSemester("");
    setDescription("");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-black mb-6">Manage Courses</h1>

      <form onSubmit={handleAddCourse} className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Course Code</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Add Course
        </button>
        {message && <p className="mt-2 text-sm text-sky-700">{message}</p>}
      </form>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
        <h2 className="text-lg font-semibold text-sky-800 mb-4">Available Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses added yet.</p>
        ) : (
          <ul className="space-y-3">
            {courses.map((course, index) => (
              <li
                key={index}
                className="border border-sky-100 p-3 rounded-lg bg-sky-50 text-sky-800"
              >
                <strong>{course.courseCode}:</strong> {course.courseTitle} <br />
                <span className="text-sm text-gray-600">
                  Dept: {course.department} | Semester: {course.semester}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
