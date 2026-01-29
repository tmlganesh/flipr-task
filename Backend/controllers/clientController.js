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

        if (req.file) {
            try {
                // Upload to Cloudinary
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'flipr-task/clients',
                            transformation: [{ width: 450, height: 350, crop: 'fill' }],
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(req.file.buffer);
                });
                imagePath = result.secure_url;
            } catch (cloudinaryError) {
                console.error('Cloudinary upload failed:', cloudinaryError.message);
                // Continue without image if Cloudinary fails
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
