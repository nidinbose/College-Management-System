import React from 'react';

const CollegeView = () => {
  return (
    <div className="relative h-[80vh]  w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/v1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay or content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-60 px-6 sm:px-8">
        {/* Text and line container */}
        <div className="flex flex-col items-center text-center mb-8 space-y-4">

 
    <div className='flex '>
    <span className="block h-[2px] w-20 sm:w-32 md:w-48 bg-[#A0CE4E]" />
  



  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-4 text-[#A0CE4E]">
    Your Right Step is <span className="text-yellow-400">just a click</span> away
  </h1>


  <span className="block h-[2px] w-20 sm:w-32 md:w-48 bg-[#A0CE4E]" />
    </div>
 
</div>
       <div className="flex gap-4">
          <button className="w-24 sm:w-28 md:w-32 h-10 sm:h-12 md:h-14 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition duration-300">
            Hello
          </button>
          <button className="w-24 sm:w-28 md:w-32 h-10 sm:h-12 md:h-14 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition duration-300">
            Hai
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeView;

