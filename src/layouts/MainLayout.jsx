import React from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;