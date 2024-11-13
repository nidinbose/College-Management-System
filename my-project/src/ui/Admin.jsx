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
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-20 w-64 h-full bg-[#A0CE4E] text-white transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <img src={user.image} alt="User profile" className="w-20 h-20 rounded-full mb-4" />
          <span className="text-md font-semibold mb-8">{user.username}</span>

          <ul className="w-full space-y-4">
            <li>
              <Link to="/admin" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/vstudent" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaUserGraduate /> Students List
              </Link>
            </li>
            <li>
              <Link to="/vstaff" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaChalkboardTeacher /> Staff List
              </Link>
            </li>
            <li>
              <Link to="/addstudents" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaPlusSquare /> Add Students
              </Link>
            </li>
            <li>
              <Link to="/addstaff" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaPlusSquare /> Add Staff
              </Link>
            </li>
            <li>
              <Link to="/courses" className="flex gap-3 items-center py-2 px-4 hover:bg-blue-700 rounded">
                <FaBook /> Courses
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full py-2 mt-4 bg-red-500 rounded">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="bg-[#A0CE4E] text-white p-4 flex justify-between items-center shadow-md">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
          <h2 className="text-lg font-bold">Welcome, {user.username}</h2>
          <div className="hidden md:flex items-center space-x-4">
            <img src={user.image} alt="User profile" className="w-8 h-8 rounded-full" />
            <button onClick={handleLogout} className="py-1 px-3 bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-8 bg-[#1B2C39]">
          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Students</h3>
              <p className="text-4xl text-blue-800 font-semibold">{studentCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Staff</h3>
              <p className="text-4xl text-blue-800 font-semibold">{staffCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Notification count</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-600">Total Users</h3>
              <p className="text-4xl text-blue-800 font-semibold">{userCount}</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Recent Activities</h3>
            <ul className="space-y-2">
              <li className="flex justify-between border-b pb-2">
                <span>New student added to the Computer Science department</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Course "Data Structures" updated</span>
                <span className="text-gray-500 text-sm">5 hours ago</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Staff member added to the Math department</span>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
