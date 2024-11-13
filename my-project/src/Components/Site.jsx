import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../additionals/Navbar';
import Start from './Start';
import Companies from './Companies';
import Achievement from './Achevements';
import Courses from './Courses';
import Categories from './Category';
import Slide1 from './CollegeView';
import Gallery from './Gallary';
import Footer from './Footer';
import Feedback from './Feedback';
import Fesilities from './Fesilities';


const Site = () => {
  

    return (
        <div>
            <Start />
           
            <Courses />
            <Achievement />
            <Companies />
            <Categories />
            <Fesilities/>
            <Feedback/>
            <Gallery />
            <Slide1 />
           
        </div>
    );
}

export default Site;
