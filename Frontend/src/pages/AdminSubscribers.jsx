import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await api.get('/subscribers');
                setSubscribers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubscribers();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Newsletter Subscribers</h2>
            <div className="bg-white shadow overflow-hidden rounded-lg max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{subscriber.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No subscribers yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSubscribers;
