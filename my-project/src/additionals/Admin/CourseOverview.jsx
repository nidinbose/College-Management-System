import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseOverview = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3003/api/getcourseid/${id}`);
        if (response.data) {
          setCourseData(response.data);
        } else {
          setError('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading course details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!courseData) {
    return <p className="text-center text-gray-600">Course data is unavailable.</p>;
  }

  return (
    <div className="p-12 mx-auto px-4 py-8 mt-[10h] bg-[#1D1D1D]">
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Section */}
        <div>
          <img
            src={courseData.photo || '/default-image.jpg'}
            alt={courseData.title}
            className="w-full h-96 bg-cover rounded-lg shadow-md"
          />
          <div className="mt-8">
            <div className="p-4 mx-auto max-w-xl bg-transparant border border-[#A0CE4E] rounded-lg shadow">
              <h1 className="text-2xl text-[#A0CE4E] font-bold text-center">Contact Us</h1>
              <form className="mt-6 space-y-4 ">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
                />
                <input
                  type="Number"
                  placeholder="phone"
                  className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
                />
                 <input
                  type="text"
                  placeholder="Preffered course"
                  className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
                />
                <textarea
                  placeholder="Message"
                  rows="5"
                  className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
                ></textarea>
                <button
                  type="button"
                  className="w-full py-2 bg-[#A0CE4E] text-white rounded-md font-semibold hover:bg-emerald-600 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-green-500">{courseData.title}</h2>
          <p className="text-gray-400 text-sm">{courseData.description}</p>
          <div className="text-gray-700">
  <table className="w-full border border-[#A0CE4E] bg-[#1D1D1D] ">
    <tbody className='text-[#A0CE4E]'>
      <tr className="border-b border-[#A0CE4E]">
        <td className="font-bold text-[#A0CE4E] px-2 py-2 w-32">Fees:</td>
        <td className="px-2 py-2 text-emerald-500 font-semibold">INR: {courseData.fees}</td>
      </tr>
      <tr className="border-b border-[#A0CE4E]">
        <td className="font-bold px-2 py-2">Year:</td>
        <td className="px-2 py-2 font-bold text-white">{courseData.year}</td>
      </tr>
      <tr>
        <td className="font-bold px-2 py-2">Course Head:</td>
        <td className="px-2 py-2 text-red-600 font-bold">{courseData.head}</td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </section>

      <div className="mt-8 flex flex-row md:space-y-0 space-x-4 items-center justify-end">
        <button className="px-6 py-3 bg-[#A0CE4E] text-white font-semibold rounded-md hover:bg-red-500 transition">
          Apply Now
        </button>
        <button className="px-6 py-3 bg-[#A0CE4E] text-white font-semibold rounded-md hover:bg-emerald-500 transition">
          Contact
        </button>
      </div>
    </div>
  );
};

export default CourseOverview;
