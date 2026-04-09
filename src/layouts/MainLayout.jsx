import React from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <ChatBot />
        </div>
    );
};

export default MainLayout;