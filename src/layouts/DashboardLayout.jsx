import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div>
            <Navbar />
            <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
                {/* Drawer Toggle */}
                <input
                    id="dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={sidebarOpen}
                    onChange={toggleSidebar}
                />

                {/* Main Content */}
                <div className="drawer-content flex flex-col">

                    {/* Page Body */}
                    <main className="">
                        <Outlet />
                    </main>
                </div>

                {/* Sidebar */}
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;