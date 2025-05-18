"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useTeacher } from "../../context/TeacherContext";
import api from "../../utils/axios";
import EditTeacherModal from "@/components/EditTeacherModal";

export default function TeachersPage() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    joiningDate: "",
    department: "",
    specialization: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState({
    submit: false,
    page: true,
    delete: false,
    update: false
  });
  
  const { addTeacher, teachers, fetchTeachers, updateTeacher } = useTeacher();
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      try {
        const result = await fetchTeachers();
        if (mounted) {
          setLoading(prev => ({ ...prev, page: false }));
          if (!result.success) {
            setMessage("Failed to load teachers. Please try again.");
          }
        }
      } catch (error) {
        if (mounted) {
          setLoading(prev => ({ ...prev, page: false }));
          setMessage("An error occurred while loading teachers.");
        }
      }
    };

    loadData();

    return () => { mounted = false; };
  }, [fetchTeachers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || 
        !formData.email.trim() || !formData.phone.trim() ||
        !formData.dob.trim() || !formData.joiningDate.trim()) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    setLoading(prev => ({ ...prev, submit: true }));
    setMessage("");

    const teacherData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      joining_date: formData.joiningDate,
      date_of_birth: formData.dob,
      address: formData.address,
      city: formData.city,
      department: formData.department,
      specialization: formData.specialization
    };

    try {
      const result = await addTeacher(teacherData);
      if (result.success) {
        setMessage(`✅ Teacher ${formData.firstName} ${formData.lastName} added successfully!`);
        setFormData(initialFormData);
        await fetchTeachers();
      } else {
        setMessage(`❌ ${result.error?.message || "Failed to add teacher"}`);
      }
    } catch (error) {
      setMessage("❌ An unexpected error occurred.");
      console.error("Error:", error);
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    
    try {
      setLoading(prev => ({ ...prev, delete: true }));
      await api.delete(`/teacher/${teacherId}`);
      await fetchTeachers();
      setMessage("✅ Teacher deleted successfully!");
    } catch (error) {
      setMessage(`❌ Failed to delete teacher: ${error.response?.data?.message || error.message}`);
      console.error("Error deleting teacher:", error);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  const handleUpdate = async (updatedData) => {
    if (!editingTeacher?.id) return;
    
    try {
      setLoading(prev => ({ ...prev, update: true }));
      const result = await updateTeacher(editingTeacher.id, {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        email: updatedData.email,
        phone_number: updatedData.phone,
        date_of_birth: updatedData.dob,
        joining_date: updatedData.joiningDate,
        address: updatedData.address,
        city: updatedData.city,
        department: updatedData.department,
        specialization: updatedData.specialization
      });
      
      if (result.success) {
        setMessage(`✅ Teacher updated successfully!`);
        setEditingTeacher(null);
        await fetchTeachers();
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ An error occurred while updating: ${error.message}`);
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  };

  useEffect(() => {
    if (editingTeacher) {
      setFormData({
        firstName: editingTeacher.first_name || "",
        lastName: editingTeacher.last_name || "",
        email: editingTeacher.email || "",
        phone: editingTeacher.phone_number || "",
        dob: editingTeacher.date_of_birth || "",
        joiningDate: editingTeacher.joining_date || "",
        address: editingTeacher.address || "",
        city: editingTeacher.city || "",
        department: editingTeacher.department || "",
        specialization: editingTeacher.specialization || ""
      });
    }
  }, [editingTeacher]);

  
  const getInitials = (teacher) => {
    const firstChar = teacher?.first_name?.charAt(0)?.toUpperCase() || '';
    const lastChar = teacher?.last_name?.charAt(0)?.toUpperCase() || '';
    return `${firstChar}${lastChar}`;
  };

  return (
    <AdminLayout>
       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 max-w-3xl space-y-4">
  <div className="flex gap-4">
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
  </div>

  <div className="flex gap-4">
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">Phone</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
  </div>

  <div className="flex gap-4">
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
    <div className="flex-1">
      <label className="block font-medium text-gray-700 mb-1">Joining Date</label>
      <input
        type="date"
        name="joiningDate"
        value={formData.joiningDate}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
      />
    </div>
  </div>

  <button
    type="submit"
    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
    disabled={loading.submit}
  >
    {loading.submit ? "Processing..." : "Add Teacher"}
  </button>
</form>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
       <h2 className="text-lg font-semibold text-sky-800 mb-4">Current Teachers</h2>
        
        {loading.page ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading teacher data...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
             <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">No teachers found</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>The system returned no teacher records.</p>
                    <button
                      onClick={fetchTeachers}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-500 font-medium"
                    >
                      ↻ Refresh data
                    </button>
                  </div>
                </div>
              </div>
          </div>
        ) : (
          <div className="space-y-4">
           <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Teachers ({teachers.length})
                </h3>
                <button
                  onClick={fetchTeachers}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                  disabled={loading.page}
                >
                  {loading.page ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Refreshing...
                    </>
                  ) : (
                    "Refresh List"
                  )}
                </button>
              </div>
            
            <ul className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <li key={teacher.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                          {getInitials(teacher)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {teacher.first_name || 'Unknown'} {teacher.last_name || 'Teacher'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {teacher.email || 'No email'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Joined: {teacher.joining_date ? new Date(teacher.joining_date).toLocaleDateString() : 'Unknown date'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTeacher(teacher)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none disabled:opacity-50"
                        disabled={loading.delete || loading.update}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none disabled:opacity-50"
                        disabled={loading.delete || loading.update}
                      >
                        {loading.delete ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          formData={formData}
          onClose={() => setEditingTeacher(null)}
          onSubmit={handleUpdate}
          onChange={handleChange}
          loading={loading.update}
        />
      )}
    </AdminLayout>
  );
}