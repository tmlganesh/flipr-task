import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaProjectDiagram, FaUserTie, FaEnvelope, FaNewspaper } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-secondary text-white min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-10 text-center border-b border-gray-700 pb-4">Admin Panel</h2>
            <nav className="space-y-4">
                <NavLink to="/admin/projects" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded transition ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                    <FaProjectDiagram />
                    <span>Projects</span>
                </NavLink>
                <NavLink to="/admin/clients" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded transition ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                    <FaUserTie />
                    <span>Clients</span>
                </NavLink>
                <NavLink to="/admin/contacts" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded transition ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                    <FaEnvelope />
                    <span>Contacts</span>
                </NavLink>
                <NavLink to="/admin/subscribers" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded transition ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                    <FaNewspaper />
                    <span>Subscribers</span>
                </NavLink>
                <NavLink to="/" className='flex items-center space-x-3 p-3 rounded transition hover:bg-gray-700 mt-10 border-t border-gray-700'>
                    <span>Back to Site</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;
