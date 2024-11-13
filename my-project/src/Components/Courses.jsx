import React from 'react';
import 'tailwindcss/tailwind.css'; 
import '../Components/css/Courses.css';

const Corses = () => {
  const cards = [
    { id: 1, title: 'Computer Engineering', image: 'https://nietm.in/wp-content/uploads/2022/11/CSE2.png' },
    { id: 2, title: 'Mechanical Engineering', image: '/images/22.jpg' },
    { id: 3, title: 'Civil Engineering', image: '/images/33.jpg' },
    { id: 4, title: 'Electrical Engineering', image: '/images/44.jpg' },
    { id: 5, title: 'Automation Engeneering', image: 'https://omdayal.com/wp-content/uploads/2022/05/aie-1.jpg' },
    { id: 6, title: 'Bigdata Engineering', image: 'https://cloudxlab.com/blog/wp-content/uploads/2018/04/why-Big-Data-Career-is-a-smart-choice.jpg' },
    { id: 7, title: 'AI Engineering', image: 'https://aidegreeguide.com/wp-content/uploads/2023/11/ai-engineer.jpg' },
    { id: 8, title: 'Architucture Engineering', image: 'https://coceg-group.com/wp-content/uploads/2020/08/Architectural-Engineering.jpg' },
 
  ];

  return (
    <div className="mx-auto xl:p-10 p-3 bg-[url('https://iticollege.edu/wp-content/uploads/2023/02/Electrical-Automation-Technology-School.jpg')] relative">
      <h1 className='relative text-[#A0CE4E] text-4xl font-bold text-center z-50 '>Our Preferred courses</h1>
      <div className="absolute inset-0 bg-black opacity-80">
           </div>
      
      <section className="relative mx-auto flex overflow-x-auto xl:overflow-x-hidden gap-6 xl:grid xl:grid-cols-4 xl:p-12 xl:gap-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative min-w-[16rem]  sm:min-w-[18rem] md:min-w-[20rem] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
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

