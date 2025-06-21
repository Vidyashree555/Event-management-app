import { useEffect, useState } from "react";
import { getPastEvents, getUpcomingEvents } from "../api";
import { Calendar, Clock, Users } from "lucide-react";
import EventCard from "./EventCard";

const EventList = ({ refreshKey }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const [upcomingEvents, pastEvents] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
      ]);
      setUpcoming(upcomingEvents);
      setPast(pastEvents);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setUpcoming(prev => prev.filter(event => event._id !== id));
    setPast(prev => prev.filter(event => event._id !== id));
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Events */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Upcoming Events
            {upcoming.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {upcoming.length}
              </span>
            )}
          </h3>
        </div>
        
        {upcoming.length > 0 ? (
          <div className="grid gap-4">
            {upcoming.map(event => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No upcoming events</p>
            <p className="text-gray-400 text-sm">Create your first event above!</p>
          </div>
        )}
      </div>

      {/* Past Events */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Past Events
            {past.length > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                {past.length}
              </span>
            )}
          </h3>
        </div>
        
        {past.length > 0 ? (
          <div className="grid gap-4">
            {past.map(event => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={handleDelete}
                isPast={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-500">No past events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;