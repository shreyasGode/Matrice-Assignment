// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./usermodel');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });
  res.send({ token });
});

module.exports = router;
