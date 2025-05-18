"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Hello, User</h2>
        <p className="text-3xl font-bold text-black">{formatTime(currentTime)}</p>
        <p className="text-gray-600">Have a nice day!</p>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm text-gray-500">{formatDate(currentTime)}</p>
          <h3 className="text-lg font-semibold text-black">Clocked In</h3>
          <span className="text-green-500 text-sm font-medium">On time</span>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition">
          Clock In
        </button>
      </div>

      <div className="text-center text-gray-700 font-medium mb-4">
        Working hours: <span className="font-bold">9:00 AM - 2:00 PM</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Worked", count: 14, color: "bg-green-100", text: "text-green-700" },
          { label: "Absent", count: 4, color: "bg-red-100", text: "text-red-700" },
          { label: "Late", count: 12, color: "bg-yellow-100", text: "text-yellow-700" },
        ].map(({ label, count, color, text }) => (
          <div key={label} className={`rounded-xl p-6 ${color} ${text} shadow`}>
            <div className="text-3xl font-bold">{count}</div>
            <div className="text-sm font-semibold">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
