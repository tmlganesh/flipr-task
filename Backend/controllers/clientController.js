const Client = require('../models/Client');

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
        let imagePath = '';

        // Use local file storage
        if (req.file) {
            // Create URL path for the uploaded file
            imagePath = `/uploads/${req.file.filename}`;
            console.log('Image saved locally:', imagePath);
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
