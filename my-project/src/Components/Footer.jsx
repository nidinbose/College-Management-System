import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url/api/subscribe', { email });
      alert('Subscription successful!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#A0CE4E] to-[#1D1D1D] text-white py-10 pb-[20vh] md:pb-[40vh] lg:pb-[50vh] xl:pb-[10vh]">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Address Section */}
        <div>
          <img src="/images/pl.png" alt="Logo" className="mb-4 w-20" />
          <h2 className="text-sm">Address 1: 123 Main St, City</h2>
          <h2 className="text-sm">Phone: (123) 456-7890</h2>
          <h2 className="text-sm">Email 1: email1@example.com</h2>
          <h2 className="text-sm">Email 2: email2@example.com</h2>
          <h2 className="text-sm">Email 3: email3@example.com</h2>
          <h3 className="text-sm">
            Website:{" "}
            <a href="https://example.com" className="text-blue-400 hover:underline">
              example.com
            </a>
          </h3>
        </div>

        {/* Links Section 1 */}
        <div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-400 text-sm">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Campus View
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Faculties
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Section 2 */}
        <div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400 text-sm">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscription & Socials Section */}
        <div>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
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
          <div className="mt-6 flex space-x-4 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img src="/icons/facebook.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img src="/icons/twitter.png" alt="Twitter" className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;


