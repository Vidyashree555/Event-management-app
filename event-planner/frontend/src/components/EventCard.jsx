import { useState } from "react";
import { deleteEvent } from "../api";
import { Calendar, MapPin, Trash2 } from "lucide-react";

const EventCard = ({ event, onDelete, isPast = false }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(event._id);
      onDelete(event._id);
    } catch (err) {
      console.error('Error deleting event:', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(event.date) > new Date();
  const cardBg = isPast ? 'bg-gray-50' : 'bg-white';
  const borderColor = isPast ? 'border-gray-200' : 'border-gray-100';

  return (
    <div className={`${cardBg} rounded-xl shadow-md hover:shadow-lg transition-shadow border ${borderColor} p-6 group`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className={`text-lg font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-gray-800'}`}>
            {event.eventName}
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
              {isUpcoming && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                  Upcoming
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
          title="Delete event"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <p className={`text-sm leading-relaxed ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
        {event.description}
      </p>
    </div>
  );
};

export default EventCard;
