const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: String,
  date: Date,
  location: String,
  description: String
});

module.exports = mongoose.model('Event', EventSchema);
