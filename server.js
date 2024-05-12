const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Importing models
const User = require('./Code/usermodel');
const Candidate = require('./Code/candidate');
// server.js
const authRoutes = require('./Code/authroutes');

// server.js
const candidateRoutes = require('./Code/candidateRoutes');




const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/myApp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));

// Routes
// User Authentication Routes
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send("User registered successfully.");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });
    res.status(200).send({ token });
});

// Candidate Management Routes
app.post('/api/candidates', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).send(candidate);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find({});
        res.status(200).send(candidates);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.use('/api', authRoutes);
app.use('/api/candidates', candidateRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
