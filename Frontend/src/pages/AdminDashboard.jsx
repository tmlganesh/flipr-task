import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            <AdminSidebar />
            <div className="flex-1 p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
