import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
    const [data, setData] = useState({
        photo: "",
        title: "",
        description: "",
        fees: "",
        year: "",
        head: ""
    });
    const [photo, setPhoto] = useState("");

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    }

    const handlePhotoChange = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setPhoto(base64);
        setData((prev) => ({ ...prev, photo: base64 }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3003/api/addcourse", data);
            console.log("Course added:", res.data);
            window.alert("Course added successfully!");
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Fees</label>
                    <input
                        type="number"
                        name="fees"
                        value={data.fees}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Year</label>
                    <input
                        type="text"
                        name="year"
                        value={data.year}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Course Head</label>
                    <input
                        type="text"
                        name="head"
                        value={data.head}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Upload Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse;
