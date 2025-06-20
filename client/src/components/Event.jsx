const Event = () => {
  // Dummy event data
  const events = [
    { id: 1, name: "Tech Conference", date: "2023-06-15", location: "Convention Center", attendees: 250 },
    { id: 2, name: "Music Festival", date: "2023-07-22", location: "Central Park", attendees: 5000 },
    { id: 3, name: "Food Expo", date: "2023-08-05", location: "Exhibition Hall", attendees: 1200 },
    { id: 4, name: "Startup Pitch", date: "2023-06-30", location: "Innovation Hub", attendees: 300 },
    { id: 5, name: "Art Exhibition", date: "2023-07-15", location: "Modern Art Museum", attendees: 800 },
    { id: 6, name: "Marathon", date: "2023-09-10", location: "City Streets", attendees: 10000 },
    { id: 7, name: "Book Fair", date: "2023-08-20", location: "Library Plaza", attendees: 1500 },
    { id: 8, name: "Film Premiere", date: "2023-07-05", location: "Grand Theater", attendees: 400 },
    { id: 9, name: "Science Fair", date: "2023-06-25", location: "University Campus", attendees: 700 },
    { id: 10, name: "Fashion Show", date: "2023-08-15", location: "Luxury Hotel", attendees: 600 }
  ];

  return (
    <div className="bg-amber-50 p-5 pt-0 rounded-lg shadow-md h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-amber-800 mb-3 sticky top-0 py-3 bg-amber-50 pb-2 z-10">Upcoming Events</h2>

      <div className="space-y-4 pr-2">
        {events.map(event => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-amber-900">{event.name}</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {event.attendees.toLocaleString()} attendees
            </div>

            <button className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
              View Details
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Event;