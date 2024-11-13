import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { FaGripLinesVertical } from "react-icons/fa";
const Feedback = () => {
  const Data = [
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fzplcp24ceMoVb7jlXCPcf6A6S25ucKWmQ&s", name: "John Doe", designation: "CHAIRMAN" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsaM-YiqDpLq51g4gl2YQqlKm-9pffDuhMow&s", name: "Jane Smith", designation: "VICE CHAIRPERSON " },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiVSQFDMQ3dAZQunPN5uDgxiXEfUc6lxDw8yG80i-00oKcNUIJcestWo-Clo4XkvH3yu0&usqp=CAU", name: "Alice Johnson", designation: "SECRETARY" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fzplcp24ceMoVb7jlXCPcf6A6S25ucKWmQ&s", name: "Bob Brown", designation: "  CO - SECRETARY" }
  ]

  return (
    <div className="xl:p-10 relative h-full absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/school-principal-office-room-professional-advertising-photography-ai-generated_925376-3513.jpg')] bg-cover bg-center ">
      <div className="absolute inset-0 bg-white opacity-70"></div>
    
        <div className='z-50 relative'>
        <h1 className="px-4 py-6 md:px-10 md:py-10 lg:px-18 lg:py-12 flex items-center justify-start text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 lg:mb-9 z-30 mt-4 md:mt-5 lg:mt-6 text-[#002D62] font-bold">
   <span>
      <FaGripLinesVertical className="text-[#A0CE4E] text-2xl md:text-3xl mr-3 md:mr-4 lg:mr-5" />
   </span>
   WE WELCOME YOU TO
CAMBRIDGE GROUP OF INSTITUTIONS
</h1>

        </div>
      <div className=" z-10 flex items-center justify-center h-full ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 w-full ">
          {Data.map((data, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90  w-98 h-full rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              {data.image && (
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-96  object-cover filter brightness-50 hover:brightness-100"
                />
              )}
              <h2 className="text-white text-2xl mt-4 absolute bottom-[80px] p-8 font-bold">{data.designation}</h2>
              <p className="text-white absolute bottom-12 font-semibold p-8 text-2xl">{data.name}</p>
              <div className='h-20 w-full bg-[#A0CE4E]'>
                  <p className='flex text-center items-center justify-center gap-5 text-2xl font-bold text-[#1B2C39] pt-5'>More Deatiles <FaArrowRight /> </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feedback

