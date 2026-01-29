import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <img src="/assets/about-us.svg" alt="About Us" className="rounded-lg shadow-lg w-full h-auto object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=About+Us'} />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-primary font-bold text-lg mb-2 uppercase tracking-wide">About Us</h2>
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">We are a designated team of architects & builders</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>
                    <button className="bg-secondary text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition">
                        Read More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
