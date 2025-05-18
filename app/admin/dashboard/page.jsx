"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { useTeacher } from "@/app/context/TeacherContext";
import { useCourse } from "@/app/context/CourseContext";
import { useStudent } from "@/app/context/StudentContext";

export default function DashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const { teachers } = useTeacher();
  const { courses } = useCourse();
  const { students } = useStudent();
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  if (!authenticated) return null;

  
  const summary = [
    { label: "Total Teachers", value: teachers?.length ?? 0 },
    { label: "Students", value: students?.length ?? 0 },
    { label: "Courses", value: courses?.length ?? 0 },
    { label: "Classes", value: 14 },
  ];

  const recentAttendance = [
    { id: 1, name: "Ali Raza", course: "Math", date: "2025-05-09", status: "Present" },
    { id: 2, name: "Sara Khan", course: "English", date: "2025-05-09", status: "Absent" },
    { id: 3, name: "Usman Tariq", course: "Physics", date: "2025-05-09", status: "Present" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Welcome to the Dashboard!</h1>
        <p className="text-md text-gray-700">
          Manage <span className="font-medium text-black">teachers</span>,{""}
          <span className="font-medium text-black">students</span>, and{" "}
          <span className="font-medium text-black">attendance</span> here.
        </p>
      </div>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
  {summary.map((item) => (
    <div
      key={item.label}
      className={`
        rounded-2xl shadow-md p-6 text-center transition duration-300
        ${
          item.label === "Total Teachers" ? "bg-blue-100 hover:bg-blue-200 text-blue-800" :
          item.label === "Students" ? "bg-green-100 hover:bg-green-200 text-green-800" :
          item.label === "Courses" ? "bg-purple-100 hover:bg-purple-200 text-purple-800" :
          "bg-amber-100 hover:bg-amber-200 text-amber-800"
        }
      `}
    >
      <div className="text-4xl font-extrabold">{item.value}</div>
      <div className="mt-2 text-sm uppercase tracking-wide font-semibold">
        {item.label}
      </div>
    </div>
  ))}
</div>

      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-sky-100 px-6 py-4 border-b border-sky-200">
          <h2 className="text-xl font-bold text-sky-800">📋 Recent Attendance</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-sky-50 text-sky-800 font-semibold">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentAttendance.map((entry, index) => (
              <tr
                key={entry.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-sky-50"
                } hover:bg-sky-100 transition`}
              >
                <td className="p-4 font-medium text-gray-700">{entry.name}</td>
                <td className="p-4 text-gray-600">{entry.course}</td>
                <td className="p-4 text-gray-600">{entry.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      entry.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
