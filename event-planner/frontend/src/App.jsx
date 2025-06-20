// src/App.jsx
import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); // Triggers re-render in EventList
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>📅 Event Planner</h1>
      <EventForm onEventAdded={handleRefresh} />
      <hr />
      <EventList key={refresh} />
    </div>
  );
};

export default App;
