const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Public (for admin)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;

        const contact = new Contact({
            fullName,
            email,
            mobile,
            city,
        });

        const createdContact = await contact.save();
        res.status(201).json(createdContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getContacts,
    createContact,
};
