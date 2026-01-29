import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get('/contact');
                setContacts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Contact Submissions</h2>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{contact.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{contact.mobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{contact.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No contacts submitted yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminContacts;
