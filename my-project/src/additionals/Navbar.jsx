import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';

const nav = [
    { name: "Home", path: '/' },
    { name: "About", path: '/feedback' },
    { name: "Our Campus", path: '/gallary' },
    { name: "Courses", path: '/courses' },
    { name: "Admissions", path: '/admissions' },
];

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3003/api/home", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { username, photo, role } = response.data.user;
                    setUser({ username, photo, role });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const closeMenu = () => {
        setToggle(false);
    };
    const nav = [
        { name: 'Apply Now', path: '/apply' },
        { name: 'Affiliations', path: '/affiliations' },
        { name: 'Campus Tour', path: '/tour' },
        { name: 'Placements', path: '/placements' },
        { name: 'Contact Us', path: '/contact' },
      ];
    return (
        <div className="w-full bg-transparent z-50 absolute top-0 left-0 hover:bg-white hover:text-black text-white font-semibold text-md font-amst">
        <div className="p-4 md:max-w-[1080px] mx-auto flex justify-between items-center">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-12 mx-auto">
            <ul className="flex gap-10 items-center justify-center">
              <li className=" text-md ">Apply Now</li>
              <li>Affiliations</li>
          
              <li>Campus Tour</li>
  
              {/* Logo */}
              <li>
                <button>
                  <Link to="/">
                    <img
                      src="/images/pl.png"
                      alt="Logo"
                      className="h-full cursor-pointer rounded-full w-20 h-20"
                    />
                  </Link>
                </button>
              </li>
  
      
  
              {/* Courses Dropdown */}
              <li className="relative">
            {/* Toggle dropdown on click */}
            <button onClick={toggleDropdown} className="cursor-pointer">
                Courses
            </button>
            {/* Dropdown menu, visible only when isDropdownOpen is true */}
            {isDropdownOpen && (
                <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-40">
                    <ul className="flex flex-col">
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Course 1</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Course 2</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Course 3</li>
                    </ul>
                </div>
            )}
        </li>

              <li>Accounts</li>
  
              <li>Contact Us</li>
            </ul>
          </div>
  
          {/* Mobile Hamburger Menu */}
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="md:hidden cursor-pointer"
            onClick={handleToggle}
          >
            <img
              src="/path/to/hamburger-icon.png"
              alt="Menu"
              className="w-8 h-8"
            />
          </motion.div>
        </div>
  
        {/* Mobile Menu */}
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={toggle ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 ${toggle ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-end p-4">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="cursor-pointer"
              onClick={closeMenu}
            >
              <img
                src="/path/to/close-icon.png"
                alt="Close"
                className="w-8 h-8"
              />
            </motion.div>
          </div>
          <div className="flex flex-col items-center mt-8 space-y-4">
            {nav.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-xl text-gray-800 hover:text-[#A0CE4E] transition duration-300"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-8">
              <button className="px-8 py-5 bg-[#208446] text-white rounded-lg shadow-md hover:bg-[#1c6c34] transition duration-300">
                Sign up for free
              </button>
            </div>
          </div>
        </motion.ul>
      </div>
   
    );
};

export default Navbar;
