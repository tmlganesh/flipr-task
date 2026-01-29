const express = require('express');
const router = express.Router();
const { getClients, createClient, deleteClient } = require('../controllers/clientController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getClients)
    .post(upload.single('image'), createClient);

router.route('/:id').delete(deleteClient);

module.exports = router;
