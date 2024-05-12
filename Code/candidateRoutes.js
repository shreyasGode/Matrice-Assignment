// routes/candidateRoutes.js
const express = require('express');
const Candidate = require('./candidate');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).send(candidate);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.send(candidates);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
