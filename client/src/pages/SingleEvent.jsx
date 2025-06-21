import React, { useEffect } from 'react'
import Header from '../components/Header.jsx';
import { useParams } from 'react-router';
import Map from '../components/Map.jsx'; // Assuming you have a Map component

function SingleEvent() {
  const { id } = useParams();
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
        lat: 28.6139,
        lng: 77.2090,
      }
    }
  ];

  useEffect(() => {
    // Fetch event details using the id from the URL
    // This is where you would typically make an API call to get the event data
    console.log(`Fetching details for event with ID: ${id}`);
    // Example: fetch(`/api/events/${id}`).then(response => response.json()).then(data => console.log(data));
  }, [id]);
  return (
    <div>
      <Header />
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-center my-8">Event Details</h1>

        <div className='flex gap-4'>

          <div className="w-full mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4">Event Map</h2>
            {/* Placeholder for map component */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              {<Map events={events} zoomIn={5} />}
            </div>
          </div>

          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Event Name</h2>
            <p className="text-gray-700 mb-2">Date: June 15, 2023</p>
            <p className="text-gray-700 mb-2">Location: Convention Center</p>
            <p className="text-gray-700 mb-2">Time: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700 mb-2">Attendees: 250</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEvent