import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseOverview = () => {
  const { id } = useParams(); 
  console.log(id);  

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
    <div className="w-full p-10 mt-12">
      <section className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2   gap-8">
        <div>
          <img
            src={courseData.photo || '/default-image.jpg'}
            alt={courseData.title}
            className="w-full h-full bg-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{courseData.title}</h2>
          <p className="text-gray-600">{courseData.description}</p>
          <div className="text-lg text-gray-700">
            <p><strong>Fees:</strong> ${courseData.fees}</p>
            <p><strong>Year:</strong> {courseData.year}</p>
            <p><strong>Course Head:</strong> {courseData.head}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 flex space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Apply Now
        </button>
        <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
          Contact
        </button>
      </div>
    </div>
  );
};

export default CourseOverview;
