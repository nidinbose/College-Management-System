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
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ username: "", image: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(null);
  const [staffCount, setStaffCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [applyCount, setApplyCount] = useState(null);
  const [notifyCount, setNotifyCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [notifications, setNotifications] = useState([]);

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
        const [studentRes, staffRes, userRes,applyRes,notifyRes,contactRes] = await Promise.all([
          axios.get("http://localhost:3003/api/studentscount"),
          axios.get("http://localhost:3003/api/staffcount"),
          axios.get("http://localhost:3003/api/usercount"),
          axios.get("http://localhost:3003/api/applycount"),
          axios.get("http://localhost:3003/api/notifycount"),
          axios.get("http://localhost:3003/api/contactcount"),
        ]);
        setStudentCount(studentRes.data.count);
        setStaffCount(staffRes.data.count);
        setUserCount(userRes.data.count);
        setApplyCount(applyRes.data.count);
        setNotifyCount(notifyRes.data.count);
        setContactCount(contactRes.data.count)
        
      } catch {
        console.error("Error fetching counts.");
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/getnotification");
        setNotifications(response.data);
      } catch {
        console.error("Error fetching notifications.");
      }
    };

    fetchCounts();
    fetchNotifications();
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
    <div className="flex h-full">
        <div>
      <aside
        className={`fixed cursor-pointer top-0 left-0 h-full bg-[#A0CE4E] overflow-y-auto z-50 text-white p-6 transform transition-transform duration-300 ${
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
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-500 rounded font-bold"
            >
              <RxDashboard className="w-7 h-7" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/addcourse"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-500 rounded font-bold"
            >
              <BiSolidBookAdd className="w-7 h-7" /> Add Courses
            </Link>
          </li>
          <li>
            <Link
              to="/addnotify"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-500 rounded font-bold"
            >
              <MdOutlineNotificationAdd className="w-7 h-7" /> Notifications
            </Link>
          </li>

          <li>
            <Link
              to="/signup"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-500 rounded font-bold"
            >
              <FaUsersCog  className="w-7 h-7" /> Add Users
            </Link>
          </li>

          <li className="text-start font-bold text-gray-300">Admissions</li>
          <li>
            <Link
              to="/appliedapplication"
              className="flex gap-3 items-center py-2 px-4 hover:bg-emerald-500 rounded font-bold"
            >
              <FaWpforms className="w-7 h-7" /> Applications
            </Link>
          </li>
          <li>
            <Link
              to="/enquiries"
              className="flex gap-3 items-center py-2 px-4 hover:bg-emerald-500 rounded font-bold"
            >
              <FaPhone className="w-7 h-7" /> Enquiries
            </Link>
          </li>

          <li className="text-start font-bold text-gray-300">Administration</li>
          <li>
            <Link
              to="/addstudents"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-600 rounded font-bold"
            >
              <FaPlusSquare className="w-7 h-7" /> Add Students
            </Link>
          </li>
          <li>
            <Link
              to="/addstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-600 rounded font-bold"
            >
              <FaPlusSquare className="w-7 h-7" /> Add Staff
            </Link>
          </li>
          <li>
            <Link
              to="/vstudent"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-600 rounded font-bold"
            >
              <FaUserGraduate className="w-7 h-7" /> Students List
            </Link>
          </li>
          <li>
            <Link
              to="/vstaff"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-600 rounded font-bold"
            >
              <FaChalkboardTeacher className="w-7 h-7" /> Staff List
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="flex gap-3 items-center py-2 px-4 hover:bg-red-600 rounded font-bold"
            >
              <FaBook className="w-7 h-7" /> Courses
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
      </div>
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } lg:ml-64`}
      >
        <header className="p-4 bg-white shadow-md flex items-center justify-end">
         <div className="flex items-center justify-end gap-5">
         <h2 className="text-lg font-semibold ">Welcome, {user.username}</h2>
         <img
    src={user.image}
    alt={user.username || "User Photo"}
    className="h-20 w-20 rounded-full border border-gray-300 object-cover"
  />
         </div>
          <button
            className="p-2 bg-blue-600 text-white rounded lg:hidden"
            onClick={handleToggleSidebar}
          >
            {isSidebarOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
          </button>
        </header>

          <main className="flex-grow p-6 bg-gray-100">
         
           <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold mb-4">Overview</h1>
           <div className="space-x-4">
           <button className="font-bold text-yellow-400 text-3xl"><AiFillMessage /></button>
           <button className="font-bold text-yellow-400 text-3xl"><IoMdNotifications /></button>
           </div>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5  gap-10">
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

            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">Pending Applications</h2>
              <p className="text-2xl font-bold">{applyCount}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">All Notifications</h2>
              <p className="text-2xl font-bold">{notifyCount}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h2 className="text-gray-700">Pending Enqiries</h2>
              <p className="text-2xl font-bold">{contactCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-5">
          <section className="border shadow-xl w-full h-full">
  <h1 className="text-lg font-bold mb-4">Notifications</h1>
  <div className="space-y-4">
    {notifications.map((notification) => {
     
      const borderColor =
        notification.Type === 'Urgent'
          ? 'border-red-500'
          : notification.Type === 'Results'
          ? 'border-yellow-400'
          : notification.Type === 'General'
          ? 'border-green-500'
            : notification.Type === 'Reminder'
          ? 'border-violet-400'
          : 'border-blue-500'; 

      const bgColor =
        notification.Type === 'Success'
          ? 'text-green-600'
          : notification.Type === 'Error'
          ? 'text-red-600'
          : notification.Type === 'Warning'
          ? 'text-yellow-600'
          : 'text-blue-600'; 

      return (
        <div
          key={notification.id}
          className={`bg-white p-4 rounded shadow border-l-4 ${borderColor}`}
        >
          <h2 className={`font-bold`}>{notification.Subject}</h2>
          <p className="text-gray-600">{notification.Matter}</p>
          <h1 className={`font-semibold bg-${bgColor}`}>{notification.Type}</h1>
          <p className="text-sm text-gray-400">
            {new Date(notification.Date).toLocaleDateString()} at{' '}
            {new Date(notification.Date).toLocaleTimeString()}
          </p>
        </div>
      );
    })}
  </div>
</section>

<section className="p-5 h-full w-full border shadow-xl">
  <div>
    <h1>Upcomming events</h1>
  </div>
</section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;

