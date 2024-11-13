import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <section className='w-full bg-white py-24 px-4'>
      <div className='w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
        
        <motion.div
          className='col-span-1'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="/images/pl.png" alt='logo-footer' className='h-[10vh]' />
          <h3 className="font-bold text-2xl mt-10">Contact us</h3>
          <h3 className="py-2 text-[#60737a]">call: 647 68658 86658</h3>
          <h3 className="py-2 text-[#60737a]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam officia .</h3>
          <h3 className="py-2 text-[#363a3d]">Email: example@gmail.com</h3>

          <div className="flex gap-4 py-4">
            <motion.div
              className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer hover:bg-[#d0f0e0]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FaFacebook size={25} />
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer hover:bg-[#d0f0e0]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FaTwitter size={25} />
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer hover:bg-[#d0f0e0]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FaLinkedin size={25} />
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-[#e9f8f3] cursor-pointer hover:bg-[#d0f0e0]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FaYoutube size={25} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='col-span-1'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-2xl mt-10">Explore</h3>
          <ul className="py-3 text-[#60737a]">
            <li className="py-2 hover:text-[#208446] transition-colors">Home</li>
            <li className="py-2 hover:text-[#208446] transition-colors">About us</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Courses</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Contact us</li>
          </ul>
        </motion.div>

        <motion.div
          className='col-span-1'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-2xl mt-10">Categories</h3>
          <ul className="py-3 text-[#60737a]">
            <li className="py-2 hover:text-[#208446] transition-colors">Design</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Development</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Marketing</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Finance</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Music</li>
            <li className="py-2 hover:text-[#208446] transition-colors">Photography</li>
          </ul>
        </motion.div>

        <motion.div
          className='col-span-1 md:col-span-2'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-2xl mt-10">Subscribe</h3>
          <h3 className="py-2 text-[#60737a]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam officia .</h3>
          <form className='input-box-shadow flex justify-between items-center bg-transparent gap-2'>
            <input
              type="text"
              className="my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500"
              placeholder='Enter your email address here'
            />
            <button className='my-2 px-5 py-3 bg-[#208446] text-white hover:bg-[#1a6b3b] transition-colors'>
              Subscribe
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Footer;
