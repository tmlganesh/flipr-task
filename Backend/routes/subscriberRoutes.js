const express = require('express');
const router = express.Router();
const { getSubscribers, createSubscriber } = require('../controllers/subscriberController');

router.route('/')
    .get(getSubscribers)
    .post(createSubscriber);

module.exports = router;
