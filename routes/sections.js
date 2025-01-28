const express = require('express');
const Section = require('../models/Section');
const Task = require('../models/Task');

const router = express.Router();

// Create a new section
router.post('/', async (req, res) => {
  const { title } = req.body;
  const section = new Section({ title });

  try {
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error });
  }
});

// Get all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().populate('tasks');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections', error });
  }
});

module.exports = router;
