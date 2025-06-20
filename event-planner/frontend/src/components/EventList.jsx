// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/events';

const EventList = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const fetchEvents = async () => {
    try {
      const [up, past] = await Promise.all([
        axios.get(`${API_BASE}/upcoming`),
        axios.get(`${API_BASE}/past`),
      ]);
      setUpcoming(up.data);
      setPast(past.data);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEvent = (event) => (
    <div key={event._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h4>{event.eventName}</h4>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <button onClick={() => handleDelete(event._id)}>Delete</button>
    </div>
  );

  return (
    <div>
      <h3>Upcoming Events</h3>
      {upcoming.length ? upcoming.map(renderEvent) : <p>No upcoming events.</p>}

      <h3>Past Events</h3>
      {past.length ? past.map(renderEvent) : <p>No past events.</p>}
    </div>
  );
};

export default EventList;
