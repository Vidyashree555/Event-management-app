// src/components/EventForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/events';

const EventForm = ({ onEventAdded }) => {
  const [form, setForm] = useState({
    eventName: '',
    date: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE, form);
      setForm({
        eventName: '',
        date: '',
        location: '',
        description: '',
      });
      onEventAdded();
    } catch (err) {
      console.error('Error creating event:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add Event</h3>
      <input name="eventName" placeholder="Event Name" value={form.eventName} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
};

export default EventForm;
