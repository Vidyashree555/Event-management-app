import { useState } from "react";
import{Calendar} from "lucide-react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Event Planner
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Organize and manage your events with ease</p>
        </div>

        {/* Main Content */}
        <EventForm onEventAdded={handleRefresh} />
        <EventList refreshKey={refresh} />
      </div>
    </div>
  );
};

export default App;