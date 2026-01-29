import React, { useState, useEffect, useRef } from 'react';
import api, { imgBaseURL } from '../utils/api';
import project1 from '../assets/project-1.svg';
import project2 from '../assets/project-2.svg';
import project3 from '../assets/project-3.svg';

const projectImages = [project1, project2, project3];

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
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
        data.append('description', formData.description);
        if (image) {
            data.append('image', image);
        }

        try {
            await api.post('/projects', data);
            setMessage('Project added successfully!');
            setFormData({ name: '', description: '' });
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchProjects();
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setMessage(`Error adding project: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            setMessage('Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            setMessage('Error deleting project.');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Manage Projects</h2>

            <div className="bg-white p-6 rounded shadow-md mb-10">
                <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
                {message && <p className="mb-4 text-sm font-semibold">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-orange-600">Add Project</button>
                </form>
            </div>

            <h3 className="text-xl font-semibold mb-4">Existing Projects ({projects.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div key={project._id} className="bg-white rounded shadow overflow-hidden">
                        <img 
                            src={project.image?.startsWith('http') ? project.image : projectImages[index % projectImages.length]} 
                            alt={project.name} 
                            className="w-full h-40 object-cover"
                            onError={(e) => e.target.src = projectImages[index % projectImages.length]}
                        />
                        <div className="p-4">
                            <h4 className="font-bold text-lg">{project.name}</h4>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{project.description}</p>
                            <button 
                                onClick={() => handleDelete(project._id)}
                                className="mt-3 text-red-600 text-sm hover:text-red-800 font-semibold"
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

export default AdminProjects;
