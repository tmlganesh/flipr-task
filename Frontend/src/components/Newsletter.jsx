import React, { useState } from 'react';
import api from '../utils/api';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/subscribers', { email });
            setIsSubscribed(true);
            setMessage('Subscribed successfully!');
            setEmail('');
            setTimeout(() => {
                setIsSubscribed(false);
                setMessage('');
            }, 5000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error subscribing. (Check DB Connection)');
        }
    };

    return (
        <section className="py-16 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Subscribe to our Newsletter</h2>
                <p className="text-gray-600 mb-8">Stay updated with our latest news and projects.</p>

                {isSubscribed ? (
                    <div className="flex flex-col items-center animate-bounce-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                        <p className="text-gray-600">You have been successfully added to our newsletter.</p>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 p-4 border border-gray-300 rounded focus:outline-none focus:border-primary"
                            />
                            <button type="submit" className="bg-primary text-white font-bold px-8 py-4 rounded hover:bg-orange-600 transition">
                                Subscribe
                            </button>
                        </form>
                        {message && <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                    </>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
