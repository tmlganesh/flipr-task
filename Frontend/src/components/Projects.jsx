import React, { useEffect, useState } from 'react';
import api, { imgBaseURL } from '../utils/api';

import project1 from '../assets/project-1.svg';
import project2 from '../assets/project-2.svg';
import project3 from '../assets/project-3.svg';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold text-lg uppercase tracking-wide">Our Projects</h2>
                    <h3 className="text-3xl font-bold text-gray-800">Our Latest Works</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.length > 0 ? projects.map((project, index) => (
                        <div key={project._id} className="group relative overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={project.image?.startsWith('http') ? project.image : [project1, project2, project3][index % 3]}
                                alt={project.name}
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                onError={(e) => e.target.src = [project1, project2, project3][index % 3]}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                                <h4 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">{project.name}</h4>
                                <p className="text-gray-200 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">{project.description}</p>
                                <button className="self-start bg-primary text-white px-4 py-2 text-sm rounded translate-y-4 group-hover:translate-y-0 transition duration-500 delay-200">
                                    Read More
                                </button>
                            </div>
                        </div>
                    )) : (
                        // Static Fallback if no projects
                        <>
                            <div className="group relative overflow-hidden rounded-lg shadow-lg">
                                <img src={project1} alt="Project 1" className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                                    <h4 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Commercial Complex</h4>
                                    <p className="text-gray-200 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">Modern commercial space design.</p>
                                    <button className="self-start bg-primary text-white px-4 py-2 text-sm rounded translate-y-4 group-hover:translate-y-0 transition duration-500 delay-200">Read More</button>
                                </div>
                            </div>
                            <div className="group relative overflow-hidden rounded-lg shadow-lg">
                                <img src={project2} alt="Project 2" className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                                    <h4 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Luxury Villa</h4>
                                    <p className="text-gray-200 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">Exquisite residential project.</p>
                                    <button className="self-start bg-primary text-white px-4 py-2 text-sm rounded translate-y-4 group-hover:translate-y-0 transition duration-500 delay-200">Read More</button>
                                </div>
                            </div>
                            <div className="group relative overflow-hidden rounded-lg shadow-lg">
                                <img src={project3} alt="Project 3" className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                                    <h4 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Urban Apartment</h4>
                                    <p className="text-gray-200 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">City living redefined.</p>
                                    <button className="self-start bg-primary text-white px-4 py-2 text-sm rounded translate-y-4 group-hover:translate-y-0 transition duration-500 delay-200">Read More</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
