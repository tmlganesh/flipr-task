import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary text-gray-300 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Flipr</h3>
                    <p className="text-sm">
                        Leading the way in consultation, design, and marketing solutions for real estate.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-primary">Home</a></li>
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Services</a></li>
                        <li><a href="#" className="hover:text-primary">Projects</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-sm">
                        <li>123 Real Estate Ave</li>
                        <li>New York, NY 10001</li>
                        <li>+1 (555) 123-4567</li>
                        <li>info@fliprTask.com</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-primary text-xl"><FaFacebook /></a>
                        <a href="#" className="hover:text-primary text-xl"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary text-xl"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary text-xl"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                &copy; {new Date().getFullYear()} Flipr Task. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
