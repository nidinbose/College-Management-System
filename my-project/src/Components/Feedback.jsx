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
    <div className="xl:p-10 relative h-full bg-white ">
    
         <h1 className='p-18  flex items-center justify-start text-2xl mb-9 mt-6 text-[#1B2C39] font-bold'>
           <span><FaGripLinesVertical className='text-[#A0CE4E] text-3xl mr-5'/></span>
            WE WELCOME YOU TO <span className='text-[#A0CE4E] ml-2'>CAMBRIDGE GROUP OF INSTITUTIONS</span></h1>
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
                  className="w-full h-96  object-cover "
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

