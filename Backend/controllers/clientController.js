const Client = require('../models/Client');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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
        let imagePath = req.body.image || ''; // Use req.body.image as fallback

        if (req.file) {
            const filename = `client-${Date.now()}.png`;
            const uploadPath = path.join(__dirname, '../uploads', filename);

            if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
                fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
            }

            await sharp(req.file.buffer)
                .resize(450, 350)
                .toFormat('png')
                .toFile(uploadPath);

            imagePath = `/uploads/${filename}`;
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
