"use client";

import { useState, useEffect } from "react";
import { useTeacher } from "../app/context/TeacherContext";

export default function EditTeacherModal({ 
  teacher, 
  onClose, 
  onUpdate,
  loading: parentLoading 
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    joiningDate: "",
    address: "",
    city: "",
    department: "",
    specialization: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { updateTeacher } = useTeacher();

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.first_name || "",
        lastName: teacher.last_name || "",
        email: teacher.email || "",
        phone: teacher.phone_number || "",
        dob: teacher.date_of_birth || "",
        joiningDate: teacher.joining_date || "",
        address: teacher.address || "",
        city: teacher.city || "",
        department: teacher.department || "",
        specialization: teacher.specialization || ""
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s\-()+]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage("");

    try {
      const teacherData = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        date_of_birth: formData.dob,
        joining_date: formData.joiningDate,
        address: formData.address.trim(),
        city: formData.city.trim(),
        department: formData.department.trim(),
        specialization: formData.specialization.trim()
      };

      const result = await updateTeacher(teacher.id, teacherData);
      
      if (result.success) {
        setMessage("✅ Teacher updated successfully!");
        setTimeout(() => {
          onUpdate(result.teacher);
          onClose();
        }, 1000);
      } else {
        setMessage(`❌ ${result.error || "Failed to update teacher"}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
          <h2 className="text-xl font-bold text-gray-800">Edit Teacher</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={loading || parentLoading}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Joining Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className={`w-full border ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black`}
                disabled={loading || parentLoading}
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={loading || parentLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              disabled={loading || parentLoading}
            >
              {loading ? "Updating..." : "Update Teacher"}
            </button>
          </div>
          
          {message && (
            <p className={`text-sm mt-2 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}