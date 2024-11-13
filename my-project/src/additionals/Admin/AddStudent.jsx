import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentid: "",
    class: "",
    department: "Computer Science",
    semester: "1st Semester",
    bloodType: "",
    dateOfBirth: "",
    photo: null,
  });

  const [previewSource, setPreviewSource] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      alert("Please log in to continue.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData((prev) => ({ ...prev, photo: base64 }));
    setPreviewSource(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.studentid.trim()) formErrors.studentid = "Student ID is required";
    if (!formData.class.trim()) formErrors.class = "Class is required";
    if (!formData.department.trim()) formErrors.department = "Department is required";
    if (!formData.semester.trim()) formErrors.semester = "Semester is required";
    if (!formData.bloodType.trim()) formErrors.bloodType = "Blood Type is required";
    if (!formData.dateOfBirth.trim()) formErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.photo) formErrors.photo = "Photo is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const res = await axios.post("http://localhost:3003/api/addstudents", formData);
      if (res.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="bg-[#1B2C39] h-full pb-[12vh] md:pb-[30vh] lg:pb-[16vh] xl:pb-[20vh]">
      <h1 className="text-center text-4xl font-semibold  text-[#A0CE4E]">Add Student Data</h1>
      <section className="text-gray-700 body-font overflow-hidden bg-[#1B2C39] h-full min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* Image Preview and Upload */}
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <img
                alt="Student"
                className="w-full h-82 object-cover object-center rounded border border-[#A0CE4E]"
                src={previewSource || formData.photo || "https://via.placeholder.com/300"}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-4 w-full text-gray-700 border border-[#A0CE4E] rounded p-2"
              />
              {errors.photo && <p className="text-red-500">{errors.photo}</p>}
            </div>
            {/* Form Fields */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 space-y-4">
  {/* Student Name */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Student Name</h2>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
    placeholder="Student Name"
  />
  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

  {/* Student ID */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Student ID</h2>
  <input
    type="text"
    name="studentid"
    value={formData.studentid}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
    placeholder="Student ID"
  />
  {errors.studentid && <p className="text-red-500 text-xs">{errors.studentid}</p>}

  {/* Class */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Class</h2>
  <input
    type="text"
    name="class"
    value={formData.class}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
    placeholder="Class"
  />
  {errors.class && <p className="text-red-500 text-xs">{errors.class}</p>}

  {/* Department */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Department</h2>
  <select
    name="department"
    value={formData.department}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
  >
    <option value="" disabled>Select Department</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
  </select>
  {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}

  {/* Semester */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Semester</h2>
  <select
    name="semester"
    value={formData.semester}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
  >
    <option value="" disabled>Select Semester</option>
    <option value="1st Semester">1st Semester</option>
    <option value="2nd Semester">2nd Semester</option>
    {/* Add more semesters as needed */}
  </select>
  {errors.semester && <p className="text-red-500 text-xs">{errors.semester}</p>}

  {/* Blood Group */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Blood Group</h2>
  <input
    type="text"
    name="bloodType"
    value={formData.bloodType}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
    placeholder="Blood Group"
  />
  {errors.bloodType && <p className="text-red-500 text-xs">{errors.bloodType}</p>}

  {/* Date of Birth */}
  <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Date of Birth</h2>
  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
  />
  {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}

  {/* Buttons */}
  <div className="flex justify-between gap-4 mt-8">
    <button
      onClick={handleSubmit}
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium text-white bg-gray-800 rounded-lg group"
    >
      <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-green-500 rounded-full opacity-0 group-hover:opacity-100"></span>
      <span className="relative">Add Student</span>
    </button>

    <button
      onClick={() => navigate("/vstudent")}
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium text-white bg-gray-800 rounded-lg group"
    >
      <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"></span>
      <span className="relative">Cancel</span>
    </button>
  </div>
</div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AddStudents;
