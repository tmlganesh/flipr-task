import React, { useState, useEffect, useRef } from 'react';
import api, { imgBaseURL } from '../utils/api';
import face1 from '../assets/face1.svg';
import face2 from '../assets/face2.svg';
import face3 from '../assets/face3.svg';
import avatar4 from '../assets/avatar6@3x.png';

const clientImages = [face1, face2, face3, avatar4];

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: '', designation: '', description: '' });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('designation', formData.designation);
        data.append('description', formData.description);
        if (image) {
            data.append('image', image);
        }

        try {
            await api.post('/clients', data);
            setMessage('Client added successfully!');
            setFormData({ name: '', designation: '', description: '' });
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchClients();
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setMessage(`Error adding client: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        try {
            await api.delete(`/clients/${id}`);
            setMessage('Client deleted successfully!');
            fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
            setMessage('Error deleting client.');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Manage Clients</h2>

            <div className="bg-white p-6 rounded shadow-md mb-10">
                <h3 className="text-xl font-semibold mb-4">Add New Client</h3>
                {message && <p className="mb-4 text-sm font-semibold">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <input type="text" name="designation" value={formData.designation} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-orange-600">Add Client</button>
                </form>
            </div>

            <h3 className="text-xl font-semibold mb-4">Existing Clients ({clients.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client, index) => (
                    <div key={client._id} className="bg-white rounded shadow p-4 flex items-start space-x-4">
                        <img 
                            src={client.image?.startsWith('http') ? client.image : clientImages[index % clientImages.length]} 
                            alt={client.name} 
                            className="w-16 h-16 rounded-full object-cover"
                            onError={(e) => e.target.src = clientImages[index % clientImages.length]}
                        />
                        <div className="flex-1">
                            <h4 className="font-bold text-lg">{client.name}</h4>
                            <p className="text-primary text-sm font-semibold">{client.designation}</p>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{client.description}</p>
                            <button 
                                onClick={() => handleDelete(client._id)}
                                className="mt-2 text-red-600 text-sm hover:text-red-800 font-semibold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminClients;
