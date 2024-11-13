import React from 'react';
import 'tailwindcss/tailwind.css'; 
import '../Components/css/Courses.css';

const Corses = () => {
  const cards = [
    { id: 1, title: 'Computer Engineering', image: 'https://nietm.in/wp-content/uploads/2022/11/CSE2.png' },
    { id: 2, title: 'Mechanical Engineering', image: '/images/22.jpg' },
    { id: 3, title: 'Civil Engineering', image: '/images/33.jpg' },
    { id: 4, title: 'Electrical Engineering', image: '/images/44.jpg' },
  ];

  return (
    <div className="mx-auto xl:p-10 p-3">
      <section className="relative mx-auto flex overflow-x-auto xl:overflow-x-hidden gap-6 xl:grid xl:grid-cols-4 xl:p-12 xl:gap-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />
            <h1 className="mt-4 pb-7 text-start p-5 text-lg font-semibold text-gray-800">{card.title}</h1>

            <div className="absolute bottom-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-[#A0CE4E] font-bold text-2xl text-white px-3 py-2 h-20 w-11 text-center rounded-l-full transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                →
              </button>
            </div>
          </div>
        ))}
      </section>

          <div className="flex justify-center mt-4 xl:hidden">
        {cards.map((card, index) => (
          <span
            key={card.id}
            className="mx-1 h-2 w-2 rounded-full bg-gray-400"
            style={{
              backgroundColor: index === 0 ? '#A0CE4E' : 'gray', 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Corses;

