import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-secondary text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <img src="/assets/logo.svg" alt="Flipr Logo" className="h-8 w-auto brightness-0 invert" />
                    Flipr
                </Link>

                {/* Public Links - Centered */}
                <div className="hidden md:flex space-x-8 items-center absolute left-1/2 transform -translate-x-1/2">
                    <a href="#home" className="hover:text-primary transition font-medium">Home</a>
                    <a href="#services" className="hover:text-primary transition font-medium">Services</a>
                    <a href="#projects" className="hover:text-primary transition font-medium">Projects</a>
                    <a href="#testimonials" className="hover:text-primary transition font-medium">Testimonials</a>
                    <a href="#contact" className="hover:text-primary transition font-medium">Contact</a>
                </div>

                {/* Admin Access - Right Aligned */}
                <div className="ml-auto hidden md:block">
                    <Link
                        to="/admin"
                        className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all shadow-sm"
                        title="Access Admin Dashboard"
                    >
                        <FaUserShield className="text-xs" />
                        <span className="font-medium">Admin</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
