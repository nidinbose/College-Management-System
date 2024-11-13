// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Start from "../Components/Start";
// import Asb from "../additionals/Staff/Asb";
// import StaffSA from "../Components/Staff/StaffSA";
// import Categories from "../Components/Category";
// import Footer from "../Components/Footer";
// import Corses from "../Components/Courses";

// const Staff = () => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState({ username: "", image: "", role: "" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please log in to continue.");
//       navigate("/login");
//     } else {
//       axios
//         .get("http://localhost:3003/api/home", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           const { username, photo, role } = response.data.user;
//           localStorage.setItem("user", JSON.stringify({ username, photo, role }));

//           if (role !== "staff") {
//             alert("Unauthorized access. Staff only.");
//             navigate("/login");
//           } else {
//             setUser({ username, image: photo, role });
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           alert("Failed to fetch user data. Please log in again.");
//           localStorage.removeItem("token");
//           navigate("/login");
//         });
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar for desktop */}
//       <motion.nav
//         className="bg-[#2D3A4B] w-[250px] p-6 space-y-6 fixed h-full hidden md:block"
//         initial={{ x: "-100%" }}
//         animate={{ x: 0 }}
//         transition={{ duration: 0.5 }}
//         style={{ zIndex: 30 }}
//       >
//         {/* Logo */}
//         <Link to="/staff" className="flex items-center mb-6">
//           <img src="/images/pl.png" alt="Logo" className="h-[80px] ml-12" />
//         </Link>

//         {/* Nav Links */}
//         <ul className="text-[#E0F2F1] space-y-4 w-22 ">
//           <li>
//             <Link to="/" className="block py-2 hover:bg-[#A0CE4E] bg-white/10 text-center rounded ">
//               Home
//             </Link>
//           </li>
//           <li>
//             <a href="/feedback" className="block py-2 hover:bg-[#A0CE4E] bg-white/10 text-center rounded ">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="/courses" className="block py-2 hover:bg-[#A0CE4E] bg-white/10 text-center rounded ">
//               Courses
//             </a>
//           </li>
//           <li>
//             <a href="/vstudent" className="block py-2 hover:bg-[#A0CE4E] bg-white/10 text-center rounded ">
//               Students
//             </a>
//           </li>

//           <li>
//             <a href="/vstaff" className="block py-2 hover:bg-[#A0CE4E] bg-white/10 text-center rounded ">
//               Staff
//             </a>
//           </li>
//         </ul>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="bg-[#A0CE4E] hover:bg-red-500 text-white py-2 px-4 w-full rounded"
//         >
//           Logout
//         </button>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <motion.div
//         className={`fixed top-0 left-0 w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center space-y-4 z-40 ${isMobileMenuOpen ? "block" : "hidden"}`}
//         initial={{ x: "-100%" }}
//         animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
//         transition={{ duration: 0.5 }}
//       >
//         <Link to="/staff" onClick={toggleMobileMenu} className="text-xl">
//           Home
//         </Link>
//         <a href="/feedback" onClick={toggleMobileMenu} className="text-xl">
//           About
//         </a>
//         <a href="/courses" onClick={toggleMobileMenu} className="text-xl">
//           Courses
//         </a>
//         <a href="#" onClick={toggleMobileMenu} className="text-xl">
//           Contac
//         </a>
//         <button
//           onClick={handleLogout}
//           className="bg-[#A0CE4E] hover:bg-red-500 py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </motion.div>

//       {/* Main Content */}
//       <div className="ml-0 md:ml-[250px] w-full">
//         <motion.header
//           className="bg-[#2D3A4B] text-white p-6 flex justify-between items-center shadow-md fixed top-0 left-0 md:left-[250px] right-0 z-20"
//           initial={{ y: "-100%" }}
//           animate={{ y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <ul className="text-[#E0F2F1] space-x-6 flex items-center">
//             <h1 className="text-2xl font-semibold " >Welcome <span className="text-[#A0CE4E]">{user.username}...</span></h1>
//             <img
//               src={user.image || "/path/to/default-avatar.png"}
//               alt="User Avatar"
//               className="w-12 h-12 rounded-full mr-4"
//             />
//           </ul>

       
//           <button onClick={toggleMobileMenu} className="md:hidden text-white">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </motion.header>

//         {/* Page Content */}
//         <div className="pt-24 px-6">
//           <StaffSA />
//           <Asb />
//           {/* <Start /> */}
//           {/* <Corses /> */}
//           {/* <Categories /> */}
//         </div>

//         {/* Footer */}
//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// };

// export default Staff;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Staff = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getData = async (username) => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstaffone`, {
        params: { username },
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to continue.");
      return navigate("/login");
    }
    try {
      const res = await axios.get("http://localhost:3003/api/home", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { username, photo, role, email } = res.data.user;
      localStorage.setItem("user", JSON.stringify({ username, photo, role, email }));
      if (role !== "staff") {
        alert("Unauthorized access. Staff only.");
        return navigate("/login");
      }
      setUser({ username, image: photo, role, email });
      getData(username);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    validateToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-full bg-white/30 text-white flex-col sm:flex-row ">

            <aside className="w-full md:w-64 bg-[#1B2C39] p-6 flex flex-col items-center h-full">
        <div className="space-y-6 w-full">
                   <div className="flex flex-col items-center text-center ">
            <img
              src={user.image || 'placeholder.jpg'}
              alt="User Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <h2 className="text-lg font-bold mt-4">{user.username}</h2>
            <p className="text-sm text-gray-300">{user.role}</p>
          </div>


          <Link to={`/courses`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Courses
          </button></Link>

<Link to={`/fees`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Fee Structure
          </button></Link>

          <Link to={`/vstudent`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Students List
          </button></Link>

          <Link to={`/ssignup`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Create Account
          </button></Link>
          <Link to={`/addmarks`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Add Mark
          </button></Link>

          <Link to={`/marklist`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Marklist
          </button></Link>

          <Link to={`/notify`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Notifications
          </button></Link>
          

          
               <button
            className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

   
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/80">
        <header className="py-4  ">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B2C39]">
            <span className='text-[#1B2C39]'>Welcome :</span> {user.username}
          </h1>
        </header>

        <section className="grid gap-6 lg:gap-10 mt-8">
                   {user.username === data?.name ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                       <div className="p-6 rounded-lg bg-[#243B51] hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center items-center p-4">
                  <img
                    alt="Student Profile"
                    className="bg-cover object-center w-auto h-full max-h-96"
                    src={data?.photo || 'placeholder.jpg'}
                  />
                </div>
                <h1 className="text-lg md:text-xl font-bold bg-[#A0CE4E] text-white py-2 px-4 rounded-lg mx-auto mt-4 w-fit">
  {data?.name || 'Student Name'}
</h1>

              </div>

              <div className="rounded-lg p-6 bg-[#1F2D3D] shadow-lg">
                <h2 className="text-md md:text-lg xl:text-xl font-semibold text-[#A0CE4E] mb-4">Student Information</h2>
                <div className="space-y-2 md:space-y-4">
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2"> Name:</span>
    <p className='font-semibold text-xl'>{data?.name || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Staff ID:</span>
    <p>{data?.staffid || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Qualification:</span>
    <p>{data?.qualification || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Experience:</span>
    <p>{data?.experience || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Department:</span>
    <p>{data?.department || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Semester:</span>
    <p>{data?.semester || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Blood Type:</span>
    <p>{data?.bloodType || "N/A"}</p>
  </div>
  <div className="flex items-center">
    <span className="text-[#A0CE4E] font-semibold mr-2">Date of Birth:</span>
    <p>{data?.dateOfBirth || "N/A"}</p>
  </div>
</div>

              </div>
            </div>
          ) : (
            <p className="text-center">You are not authorized to view this profile.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Staff;
