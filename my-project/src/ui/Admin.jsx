import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaPlusSquare,
  FaClipboardList,
  FaBook,
  FaBell,
  FaPhone,
  FaListAlt,
} from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const Admin = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: "", image: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(null);
  const [staffCount, setStaffCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to continue.");
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3003/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { username, photo, role, token } = response.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify({ username, photo, role }));

          if (role !== "admin") {
            alert("Unauthorized access. Admins only.");
            navigate("/login");
          } else {
            setUser({ username, image: photo, role });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("Failed to fetch user data. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        });
    }

    const fetchCounts = async () => {
      try {
        const [studentRes, staffRes, userRes] = await Promise.all([
          axios.get("http://localhost:3003/api/studentscount"),
          axios.get("http://localhost:3003/api/staffcount"),
          axios.get("http://localhost:3003/api/usercount"),
        ]);
        setStudentCount(studentRes.data.count);
        setStaffCount(staffRes.data.count);
        setUserCount(userRes.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <aside className="fixed w-64 h-screen bg-[#A0CE4E] text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <img
          src={user.image}
          alt="User profile"
          className="w-20 h-20 rounded-full mb-4 mx-auto"
        />
        <span className="text-md font-semibold mb-8 text-center">
          {user.username}
        </span>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/vstudent"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaUserGraduate /> Students List
            </Link>
          </li>
          <li>
            <Link
              to="/vstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaChalkboardTeacher /> Staff List
            </Link>
          </li>
          <li>
            <Link
              to="/addstudents"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaPlusSquare /> Add Students
            </Link>
          </li>
          <li>
            <Link
              to="/addstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaPlusSquare /> Add Staff
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaBook /> Courses
            </Link>
          </li>

          <li>
            <Link
              to="/addcourse"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaBook />Add Courses
            </Link>
          </li>
          <li>
            <Link
              to="/addnotify"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaBell /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/appliedapplication"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaListAlt /> Applications
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded"
            >
              <FaPhone /> Contacts
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-6 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 bg-[#1B2C39]">
        <h2 className="text-xl text-white font-bold">Welcome, {user.username}</h2>
        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-600">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-blue-800">{studentCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Staff</h3>
            <p className="text-3xl font-bold text-blue-800">{staffCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-blue-800">{userCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
