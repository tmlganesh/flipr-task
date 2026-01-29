const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
