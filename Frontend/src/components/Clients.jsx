import React, { useEffect, useState } from 'react';
import api, { imgBaseURL } from '../utils/api';

import face1 from '../assets/face1.svg';
import face2 from '../assets/face2.svg';
import face3 from '../assets/face3.svg';
import avatar4 from '../assets/avatar6@3x.png';

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await api.get('/clients');
                setClients(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchClients();
    }, []);

    const clientImages = [face1, face2, face3, avatar4];

    // Helper function to get proper image source
    const getImageSrc = (client, index) => {
        if (client.image) {
            if (client.image.startsWith('http')) {
                return client.image;
            }
            // Local storage path
            return `${imgBaseURL}${client.image}`;
        }
        return clientImages[index % clientImages.length];
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold text-lg uppercase tracking-wide">Testimonials</h2>
                    <h3 className="text-3xl font-bold text-gray-800">Happy Clients</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                    {clients.length > 0 ? clients.map((client, index) => (
                        <div key={client._id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow relative h-full flex flex-col">
                            <div className="flex items-center mb-6">
                                <img
                                    src={getImageSrc(client, index)}
                                    alt={client.name}
                                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary flex-shrink-0"
                                    onError={(e) => e.target.src = clientImages[index % clientImages.length]}
                                />
                                <div>
                                    <h4 className="font-bold text-lg text-secondary line-clamp-1">{client.name}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">{client.designation}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic flex-grow">"{client.description}"</p>
                        </div>
                    )) : (
                        // Static Fallback
                        <>
                            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow relative h-full flex flex-col">
                                <div className="flex items-center mb-6">
                                    <img src={face1} alt="Client 1" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary">Sarah Jenkins</h4>
                                        <p className="text-sm text-gray-500">Homeowner</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic flex-grow">"Flipr made finding our dream home incredibly easy. Their design insights were invaluable."</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow relative h-full flex flex-col">
                                <div className="flex items-center mb-6">
                                    <img src={face2} alt="Client 2" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary">Michael Chen</h4>
                                        <p className="text-sm text-gray-500">Investor</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic flex-grow">"The ROI analysis provided was spot on. Highly recommend their consulting services."</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow relative h-full flex flex-col">
                                <div className="flex items-center mb-6">
                                    <img src={face3} alt="Client 3" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary">Emily Davids</h4>
                                        <p className="text-sm text-gray-500">Architect</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic flex-grow">"A fantastic partner in our recent developments. Professional and detail-oriented."</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Clients;
