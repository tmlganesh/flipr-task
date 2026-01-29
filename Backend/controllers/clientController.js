const Client = require('../models/Client');
const cloudinary = require('../config/cloudinary');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public
const getClients = async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a client
// @route   POST /api/clients
// @access  Public
const createClient = async (req, res) => {
    try {
        const { name, designation, description } = req.body;
        let imagePath = req.body.image || '';

        console.log('Creating client, file received:', req.file ? 'Yes' : 'No');

        if (req.file) {
            try {
                console.log('Uploading to Cloudinary...');
                // Upload to Cloudinary
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'flipr-task/clients',
                            transformation: [{ width: 450, height: 350, crop: 'fill' }],
                        },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary callback error:', error);
                                reject(error);
                            } else {
                                console.log('Cloudinary upload success:', result.secure_url);
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(req.file.buffer);
                });
                imagePath = result.secure_url;
                console.log('Image path set to:', imagePath);
            } catch (cloudinaryError) {
                console.error('Cloudinary upload failed:', cloudinaryError.message);
                return res.status(500).json({ message: 'Image upload failed: ' + cloudinaryError.message });
            }
        }

        const client = new Client({
            name,
            designation,
            description,
            image: imagePath,
        });

        const createdClient = await client.save();
        res.status(201).json(createdClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (client) {
            await client.deleteOne();
            res.json({ message: 'Client removed' });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getClients,
    createClient,
    deleteClient,
};
