import React, { useEffect, useState } from 'react';
import api from './api';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data));
  }, []);

  const addEvent = event => setEvents([...events, event]);
  const deleteEvent = id => setEvents(events.filter(e => e._id !== id));

  return (
    <div>
      <h1>Event Planner</h1>
      <EventForm onAdd={addEvent} />
      <EventList events={events} onDelete={deleteEvent} />
    </div>
  );
}

export default App;
