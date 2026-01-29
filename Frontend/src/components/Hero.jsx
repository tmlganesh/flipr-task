import React, { useState } from 'react';
import api from '../utils/api';

const Hero = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        city: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contact', formData);
            setStatus('Quote requested successfully!');
            setFormData({ fullName: '', email: '', mobile: '', city: '' });
        } catch (error) {
            setStatus('Error sending request.');
        }
    };

    return (
        <div className="relative bg-secondary text-white py-20 overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 opacity-20">
                <img src="/assets/hero-bg.svg" alt="Background" className="w-full h-full object-cover object-top" onError={(e) => e.target.style.display = 'none'} />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Consultation,<br />
                        <span className="text-primary">Design</span> &<br />
                        Marketing
                    </h1>
                </div>

                <div className="md:w-1/3 bg-white text-gray-800 p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">Get a Quick Quote</h2>
                    {status && <p className="mb-4 text-center text-sm font-semibold text-green-600">{status}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                        />
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                        />
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-orange-600 transition duration-300">
                            Get Quick Quote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
