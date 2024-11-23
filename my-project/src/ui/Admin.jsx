import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaPlusSquare,
  FaWpforms,
  FaPhone,
  FaBook,
} from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { BiSolidBookAdd } from "react-icons/bi";

const Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          if (role !== "admin") {
            alert("Unauthorized access. Admins only.");
            navigate("/login");
          } else {
            setUser({ username, image: photo, role });
            setLoading(false);
          }
        })
        .catch(() => {
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
      } catch {
        console.error("Error fetching counts.");
      }
    };

    fetchCounts();
  }, [navigate]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
    <div className="flex h-screen">
        <div>
      <aside
        className={`fixed top-0 left-0 h-full bg-[#002d94] overflow-y-auto text-white p-6 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 z-40`}
      >
         <div className="flex items-center gap-4 mb-8">
          <img src="/images/pl.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg font-bold">Cambridge College</h1>
        </div>
        <ul className="space-y-4">
          <li className="text-start font-bold text-gray-300">Main</li>
          <li>
            <Link
              to="/admin"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <RxDashboard className="w-7 h-7" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/addcourse"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <BiSolidBookAdd className="w-7 h-7" /> Add Courses
            </Link>
          </li>
          <li>
            <Link
              to="/addnotify"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <MdOutlineNotificationAdd className="w-7 h-7" /> Notifications
            </Link>
          </li>

          <li className="text-start font-bold text-gray-300">Admissions</li>
          <li>
            <Link
              to="/appliedapplication"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaWpforms className="w-7 h-7" /> Applications
            </Link>
          </li>
          <li>
            <Link
              to="/enquiries"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaPhone className="w-7 h-7" /> Enquiries
            </Link>
          </li>

          <li className="text-start font-bold text-gray-300">Administration</li>
          <li>
            <Link
              to="/addstudents"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaPlusSquare className="w-7 h-7" /> Add Students
            </Link>
          </li>
          <li>
            <Link
              to="/addstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaPlusSquare className="w-7 h-7" /> Add Staff
            </Link>
          </li>
          <li>
            <Link
              to="/vstudent"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaUserGraduate className="w-7 h-7" /> Students List
            </Link>
          </li>
          <li>
            <Link
              to="/vstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaChalkboardTeacher className="w-7 h-7" /> Staff List
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded font-bold"
            >
              <FaBook className="w-7 h-7" /> Courses
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-6 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>
      </div>
      

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } lg:ml-64`}
      >
        {/* Header */}
        <header className="p-4 bg-white shadow-md flex items-center justify-end">
          <h2 className="text-lg font-semibold ">Welcome, {user.username}</h2>
          <button
            className="p-2 bg-blue-600 text-white rounded lg:hidden"
            onClick={handleToggleSidebar}
          >
            {isSidebarOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </header>

        {/* Dashboard Overview */}
        <main className="flex-grow p-6 bg-gray-100">
         
           <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold mb-4">Overview</h1>
           <div className="space-x-4">
           <button>ghj</button>
           <button>ghj</button>
           </div>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">Total Students</h2>
              <p className="text-2xl font-bold">{studentCount}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">Total Staff</h2>
              <p className="text-2xl font-bold">{staffCount}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">Total Users</h2>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;

