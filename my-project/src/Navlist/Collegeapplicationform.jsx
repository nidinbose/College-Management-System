import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const CollegeApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    religion: '',
    cast: '',
    address: '',
    pincode: '',
    schoolName: '',
    yearOfPassout: '',
    aadharNo: '',
    sslcRegistrationNumber: '',
    higherSecondaryRegistrationNumber: '',
    percentageHigherSecondary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://your-backend-api-url.com/applications', formData);
      alert('Application submitted successfully!');
      generatePDF();
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('College Application Form', 10, 10);

    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${value}`, 10, 20 + index * 10);
    });

    doc.save('College_Application_Form.pdf');
  };

  return (
    <div className="max-w-full mx-auto p-12 xl:p-[100px] xxl:p-[120px] bg-[#1D1D1D]  shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <img src="/images/pl.png" alt="College Logo" className="h-16 w-16 mr-4" />
        <h2 className="text-3xl font-bold text-white">Cambridge college</h2>
      </div>
      <div className='flex items-center justify-between'>
      <h3 className="text-2xl font-semibold text-center mb-6 text-[#A0CE4E]">Application Form</h3>
      <Link to={``}>
      <h3 className="text-sm font-semibold text-center mb-6 text-blue-400 underline">mobile form link</h3></Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <table className="min-w-full bg-[#A0CE4E] rounded-xl border-[#A0CE4E]">
          <tbody>
            <tr>
              <td className="p-4 border text-violet-600">First Name</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </td>
              <td className="p-4 border text-violet-600">Last Name</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Date of Birth</td>
              <td className="p-4 border">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </td>
              <td className="p-4 border text-violet-600">Sex</td>
              <td className="p-4 border">
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Religion</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="p-4 border text-violet-600">Caste</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Address</td>
              <td className="p-4 border" colSpan="3">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Pincode</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="p-4 border text-violet-600">School Name</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Year of Passout</td>
              <td className="p-4 border">
                <input
                  type="number"
                  name="yearOfPassout"
                  value={formData.yearOfPassout}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="p-4 border text-violet-600">Aadhar No.</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">SSLC Registration Number</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="sslcRegistrationNumber"
                  value={formData.sslcRegistrationNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="p-4 border text-violet-600">Higher Secondary Registration No.</td>
              <td className="p-4 border">
                <input
                  type="text"
                  name="higherSecondaryRegistrationNumber"
                  value={formData.higherSecondaryRegistrationNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="p-4 border text-violet-600">Percentage in Higher Secondary</td>
              <td className="p-4 border" colSpan="3">
                <input
                  type="number"
                  name="percentageHigherSecondary"
                  value={formData.percentageHigherSecondary}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
        >
          Submit and Download PDF
        </button>

        <button
          type="button"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
          onClick={generatePDF}
        >
          Download PDF
        </button>
      </form>
    </div>
  );
};

export default CollegeApplicationForm;

