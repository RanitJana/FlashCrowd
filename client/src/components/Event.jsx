import { useSelector } from "react-redux";

const Event = () => {
  // Dummy event data with added coordinates and times
  const events = [
    {
      id: 1,
      name: "Tech Conference",
      date: "2023-06-15",
      location: "Convention Center",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      attendees: 250,
      coords: [28.6139, 77.2090],
    },
    {
      id: 2,
      name: "Music Festival",
      date: "2023-07-22",
      location: "Central Park",
      startTime: "3:00 PM",
      endTime: "10:00 PM",
      attendees: 5000,
      coords: [40.7851, -73.9683],
    },
    {
      id: 3,
      name: "Food Expo",
      date: "2023-08-05",
      location: "Exhibition Hall",
      startTime: "12:00 PM",
      endTime: "8:00 PM",
      attendees: 1200,
      coords: [34.0522, -118.2437],
    },
    {
      id: 4,
      name: "Startup Pitch",
      date: "2023-06-30",
      location: "Innovation Hub",
      startTime: "11:00 AM",
      endTime: "2:00 PM",
      attendees: 300,
      coords: [51.5074, -0.1278],
    },
    {
      id: 5,
      name: "Art Exhibition",
      date: "2023-07-15",
      location: "Modern Art Museum",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      attendees: 800,
      coords: [48.8566, 2.3522],
    },
    {
      id: 6,
      name: "Marathon",
      date: "2023-09-10",
      location: "City Streets",
      startTime: "6:00 AM",
      endTime: "12:00 PM",
      attendees: 10000,
      coords: [35.6895, 139.6917],
    },
    {
      id: 7,
      name: "Book Fair",
      date: "2023-08-20",
      location: "Library Plaza",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      attendees: 1500,
      coords: [37.7749, -122.4194],
    },
    {
      id: 8,
      name: "Film Premiere",
      date: "2023-07-05",
      location: "Grand Theater",
      startTime: "7:00 PM",
      endTime: "10:00 PM",
      attendees: 400,
      coords: [41.8781, -87.6298],
    },
    {
      id: 9,
      name: "Science Fair",
      date: "2023-06-25",
      location: "University Campus",
      startTime: "11:00 AM",
      endTime: "4:00 PM",
      attendees: 700,
      coords: [52.52, 13.405],
    },
    {
      id: 10,
      name: "Fashion Show",
      date: "2023-08-15",
      location: "Luxury Hotel",
      startTime: "6:30 PM",
      endTime: "9:30 PM",
      attendees: 600,
      coords: [55.7558, 37.6176],
    },
  ];

  const auth = useSelector(info => info.authReducer.auth);
  console.log("----------->", auth?.picture);

  return (
    <div className="bg-gray-100 p-5 pt-0 rounded-2xl shadow-md h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-3 sticky top-0 py-5 bg-gray-100 z-10 border-b border-gray-300">
        Ongoing Events
      </h2>

      <div className="space-y-4 pr-2">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                <p className="text-gray-600 text-sm">{event.location}</p>
                <p className="text-gray-500 text-sm">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {event.attendees.toLocaleString()} attendees
            </div>

            <button className="mt-3 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
