const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Add new event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ date: { $gte: now } }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get past events
router.get('/past', async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ date: { $lt: now } }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete event by ID
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update event by ID (optional if you use edit functionality)
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
