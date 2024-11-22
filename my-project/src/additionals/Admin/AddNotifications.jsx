import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNotifications = () => {
  const [formData, setFormData] = useState({
    Subject: "",
    Date: "",
    Matter: "",
    Type: "",
  });


  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({ ...prevData, Date: currentDate }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/api/notify", formData);
      alert("Notification added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Failed to add notification. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D1D1D]">
      <form
        className="bg-[#A0CE4E] p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Add Notification
        </h2>

            <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-600">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="Subject"
            value={formData.Subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="matter" className="block text-sm font-medium text-gray-600">
            Matter
          </label>
          <textarea
            id="matter"
            name="Matter"
            value={formData.Matter}
            onChange={handleChange}
            placeholder="Enter the details of the notification"
            required
            rows="4"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D1D1D]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-600">
            Type
          </label>
          <select
            id="type"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A0CE4E]"
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="General">General</option>
            <option value="Urgent">Urgent</option>
            <option value="Results">Results</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-[#A0CE4E] focus:ring-offset-2"
        >
          Add Notification
        </button>
      </form>
    </div>
  );
};

export default AddNotifications;
