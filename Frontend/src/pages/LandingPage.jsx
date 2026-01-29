import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Clients from '../components/Clients';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="font-sans antialiased text-gray-900">
            <Navbar />
            <div id="home">
                <Hero />
            </div>
            <section className="py-16 bg-gray-100 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Not Your Average Realtor</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide a unique approach to real estate matching people with the perfect properties using our consulting, design and marketing expertise.
                    </p>
                </div>
            </section>
            <section id="services" className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center p-3">
                                <img src="/assets/icon-roi.svg" alt="ROI" className="w-full h-full" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Potential ROI</h3>
                            <p className="text-gray-600">Consider whether you want to verify the potential growth.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center p-3">
                                <img src="/assets/icon-design.svg" alt="Design" className="w-full h-full" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Design</h3>
                            <p className="text-gray-600">We design with the best style, matching your needs.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center p-3">
                                <img src="/assets/icon-marketing.svg" alt="Marketing" className="w-full h-full" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Marketing</h3>
                            <p className="text-gray-600">We help you market locally and globally.</p>
                        </div>
                    </div>
                </div>
            </section>
            <About />
            <div id="projects">
                <Projects />
            </div>
            <div id="testimonials">
                <Clients />
            </div>
            <Newsletter />
            <div id="contact">
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
