const Subscriber = require('../models/Subscriber');

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Public (for admin)
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({});
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const createSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        const subscriberExists = await Subscriber.findOne({ email });
        if (subscriberExists) {
            res.status(400).json({ message: 'Email already subscribed' });
            return;
        }

        const subscriber = new Subscriber({
            email,
        });

        const createdSubscriber = await subscriber.save();
        res.status(201).json(createdSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSubscribers,
    createSubscriber,
};
