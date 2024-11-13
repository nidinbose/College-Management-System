import React, { useState, useRef } from 'react'; // Import useState here
import { FaGripLinesVertical, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './css/Fesilities.css';

const pics = [
  { photo: "https://www.tajglobalacademy.com/Uploads/fileupload/33ICT-Lab.jpg", title: "Computer lab" },
  { photo: "https://www.topmastersineducation.com/wp-content/uploads/2020/05/10-Universities-and-Colleges-With-Beautiful-or-Unusual-Libraries.jpg", title: "Library" },
  { photo: "https://www.topmastersineducation.com/wp-content/uploads/2020/05/10-Universities-and-Colleges-With-Beautiful-or-Unusual-Libraries.jpg", title: "Classroom" },
  { photo: "https://www.topmastersineducation.com/wp-content/uploads/2020/05/10-Universities-and-Colleges-With-Beautiful-or-Unusual-Libraries.jpg", title: "Lab" },
  { photo: "https://www.topmastersineducation.com/wp-content/uploads/2020/05/10-Universities-and-Colleges-With-Beautiful-or-Unusual-Libraries.jpg", title: "Entertainment" },
];

const Fesilities = () => {
  const scrollRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://admission.brown.edu/sites/default/files/styles/ultrawide_med/public/2020-06/Hosted-Virtual-Campus-Tour-banner-larger.jpg?h=298f6650&itok=Px6xB336')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-blue-500 opacity-60"></div> {/* Blue Overlay */}
      
      {/* Content Section */}
      <section className="relative z-10 flex flex-col items-center text-white text-center p-6 space-y-8 pb-10">
        {/* Title Section */}
        <div className="w-full max-w-4xl p-4 bg-opacity-75 rounded-lg flex flex-col items-start">
          <h1 className="text-4xl md:text-2xl lg:text-4xl font-semibold flex items-center">
            <FaGripLinesVertical className="text-[#A0CE4E] text-3xl mr-2 mb-5" />
            Providing World-Class Facilities
          </h1>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="relative flex items-center justify-center w-full mb-4">
          <button
            onClick={scrollLeft}
            className="absolute bottom-0 left-4 text-white text-2xl bg-[#A0CE4E] bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors mb-5"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="absolute bottom-0 right-4 text-white text-2xl bg-[#A0CE4E] bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors mb-5"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Image Carousel */}
        <div ref={scrollRef} className="flex items-center overflow-x-auto mt-3 scrollbar-hide gap-1" id="scrollbar">
          {pics.map((pic, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex-shrink-0 relative overflow-hidden bg-gray-100 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <img
                src={pic.photo}
                alt={pic.title}
                className="h-[50vh] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <h1 className="absolute bottom-3 left-7 font-bold text-white text-center py-2 text-4xl">
                {pic.title}
              </h1>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default Fesilities;
