import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-backend-url/api/subscribe', { email });
      alert('Subscription successful!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#A0CE4E] to-[#1D1D1D] md:pb-[30vh] xl:pb-[10vh] lg:pb-[50vh]  text-white py-10">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {/* Address Section */}
        <div>
          <img src="/images/pl.png" alt="Logo" className="mb-4 w-20" />
          <h2>Address 1: 123 Main St, City</h2>
          <h2>Phone: (123) 456-7890</h2>
          <h1>Email 1: email1@example.com</h1>
          <h1>Email 2: email2@example.com</h1>
          <h1>Email 3: email3@example.com</h1>
          <h3>Website: <a href="https://example.com" className="text-blue-400">example.com</a></h3>
        </div>

        {/* Links Section 1 */}
        <div>
          <ul className="space-y-2 p-12">
            <li><Link to={`/`} className="hover:text-blue-400">Home</Link></li>
            <li><Link to={`/courses`} className="hover:text-blue-400">Courses</Link></li>
            <li><Link to={`/`} className="hover:text-blue-400">campus view</Link></li>
            <li><Link to={`/`} className="hover:text-blue-400">Faculities</Link></li>
          </ul>
        </div>

        {/* Links Section 2 */}
        <div>
          <ul className="space-y-2 p-12">
          <li><Link to={`/`} className="hover:text-blue-400">Gallary</Link></li>
          <li><Link to={`/`} className="hover:text-blue-400">Gallary</Link></li>
          <li><Link to={`/`} className="hover:text-blue-400">Home</Link></li>
          <li><Link to={`/`} className="hover:text-blue-400">Home</Link></li>
          </ul>
        </div>

        {/* Subscription & Socials Section */}
        <div>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-4 p-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.png" alt="Facebook" className="w-6 h-6 hover:opacity-80" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter.png" alt="Twitter" className="w-6 h-6 hover:opacity-80" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.png" alt="Instagram" className="w-6 h-6 hover:opacity-80" />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

