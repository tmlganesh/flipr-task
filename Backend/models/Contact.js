const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
