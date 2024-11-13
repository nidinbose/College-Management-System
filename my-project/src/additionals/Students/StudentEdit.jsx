import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [previewSource, setPreviewSource] = useState("");

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.patch(`http://localhost:3003/api/updatestudent/${id}`, data);
        if (res.status === 201) {
            navigate('/vstudent');
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        if (!isAuthenticated) {
            alert("Please log in to continue.");
            navigate('/login');
        }
    }, [navigate]);

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3003/api/getstudentedit/${id}`);
        setData(res.data);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setData((prev) => ({ ...prev, photo: base64 }));
        setPreviewSource(base64);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <h1 className="text-center text-4xl font-semibold my-6">Edit Student Data</h1>
            <section className="text-gray-700 body-font overflow-hidden bg-white h-full min-h-screen ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* Image Preview and Upload */}
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <img
                                alt="Student"
                                className="w-full h-80 object-cover object-center rounded border border-gray-200"
                                src={previewSource || data.photo || "https://via.placeholder.com/300"}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-4 w-full text-gray-700 border border-gray-300 rounded p-2"
                            />
                        </div>
                        {/* Form Fields */}
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Student Name</h2>
                            <input
                                type="text"
                                name="name"
                                value={data.name || ""}
                                onChange={handleChange}
                                className="leading-relaxed w-full mb-4 p-2 border rounded"
                                placeholder="Student Name"
                            />

                            <p className="border border-2 rounded-lg font-semibold mb-4">
                                Student ID:
                                <input
                                    type="text"
                                    name="studentid"
                                    value={data.studentid || ""}
                                    onChange={handleChange}
                                    className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
                                    placeholder="Student ID"
                                />
                            </p>

                            <p className="border border-2 rounded-lg font-semibold mb-4">
                                Class:
                                <input
                                    type="text"
                                    name="class"
                                    value={data.class || ""}
                                    onChange={handleChange}
                                    className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
                                    placeholder="Class"
                                />
                            </p>
                            <p className="border border-2 rounded-lg font-semibold mb-4">
    Department:
    <select
        name="department"
        value={data.department || ""}
        onChange={handleChange}
        className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
    >
        <option value="" disabled>
            Select Department
        </option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
    </select>
</p>


                            <p className="border border-2 rounded-lg font-semibold mb-4">
                                Semester:
                                <input
                                    type="text"
                                    name="semester"
                                    value={data.semester || ""}
                                    onChange={handleChange}
                                    className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
                                    placeholder="Semester"
                                />
                            </p>

                            <p className="border border-2 rounded-lg font-semibold mb-4">
                                Blood Group:
                                <input
                                    type="text"
                                    name="bloodType"
                                    value={data.bloodType || ""}
                                    onChange={handleChange}
                                    className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
                                    placeholder="Blood Group"
                                />
                            </p>

                            <p className="border border-2 rounded-lg font-semibold mb-4">
                                Date of Birth:
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={data.dateOfBirth || ""}
                                    onChange={handleChange}
                                    className="leading-relaxed pb-3 text-center mt-2 w-full border-transparent"
                                />
                            </p>

                            <div className="flex mt-6">
                                <button
                                    onClick={handleSubmit}
                                    className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => navigate('/vstudent')}
                                    className="ml-4 flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentsEdit;
