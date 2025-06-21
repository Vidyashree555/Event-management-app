import { useState } from "react";
import { Plus, Calendar, MapPin, X } from "lucide-react";

// Mock API function - replace with your actual createEvent function
const createEvent = async (eventData) => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const EventForm = ({ onEventAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    eventName: '',
    date: '',
    location: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.eventName || !form.date || !form.location || !form.description) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createEvent(form);
      setForm({
        eventName: '',
        date: '',
        location: '',
        description: '',
      });
      setIsModalOpen(false);
      onEventAdded();
    } catch (err) {
      console.error('Error creating event:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setForm({
        eventName: '',
        date: '',
        location: '',
        description: '',
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-3">
            <div className="p-1 bg-white/20 rounded-full">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-lg">Add New Event</span>
          </div>
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleOverlayClick}
        >
          {/* Modal Content */}
          <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-white/20 transition-all duration-500 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 border-b border-gray-100/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-30"></div>
                    <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Create New Event
                    </h3>
                    <p className="text-gray-500 mt-1">Fill in the details to add your event</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="relative p-3 hover:bg-white/50 rounded-2xl transition-all duration-200 group disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Event Name
                    </label>
                    <div className="relative group">
                      <input
                        name="eventName"
                        placeholder="Enter event name"
                        value={form.eventName}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 placeholder-gray-400"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Date
                    </label>
                    <div className="relative group">
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                      />
                      <Calendar className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Location
                  </label>
                  <div className="relative group">
                    <input
                      name="location"
                      placeholder="Enter location"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 pl-14 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 placeholder-gray-400"
                    />
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description
                  </label>
                  <div className="relative group">
                    <textarea
                      name="description"
                      placeholder="Enter event description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 resize-none placeholder-gray-400"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative bg-gradient-to-r from-gray-50/80 to-gray-50/60 backdrop-blur-sm border-t border-gray-100/50 p-8">
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="relative px-8 py-3 text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium disabled:opacity-50 group"
                >
                  <span className="relative z-10">Cancel</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !form.eventName || !form.date || !form.location || !form.description}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <div className="p-0.5 bg-white/20 rounded-full">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span>Create Event</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventForm;