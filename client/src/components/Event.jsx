import EventCard from "./EventCard.jsx";

const Event = () => {
  // Dummy event data with added coordinates and times
  const events = [
    {
      id: 1,
      title: "Tech Conference",
      description: "A conference for tech enthusiasts.",
      date: "2023-06-15",
      location: "Convention Center",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      attendees: 250,
      position: {
        lat: 200.6139,
        lng: 77.2090,
      }
    }
  ];

  // const auth = useSelector(info => info.authReducer.auth);

  return (
    <div className="bg-gray-100 p-5 pt-0 rounded-2xl shadow-md h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-3 sticky top-0 py-5 bg-gray-100 z-10 border-b border-gray-300">
        Ongoing Events
      </h2>

      <div className="space-y-4 pr-2">
        {events.map(event => <EventCard event={event} key={event.id} />)}
      </div>
    </div>
  );
};




export default Event;
