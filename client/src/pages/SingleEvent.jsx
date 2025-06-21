import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import { useParams } from 'react-router';
import Map from '../components/Map.jsx';

function SingleEvent() {
  const { id } = useParams();

  const event = {
    id: 1,
    title: "Tech Conference",
    description: "A conference for tech enthusiasts.",
    date: "2023-06-15",
    location: "Convention Center",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    host: {
      fullName: "John Doe",
      _id: "12345",
      avatar: "https://res.cloudinary.com/du4bs9xd2/image/upload/v1750344689/profile_image_srdpjg.png"
    },
    attendees: 250,
    position: {
      lat: 28.6139,
      lng: 77.2090,
    }
  };

  useEffect(() => {
    console.log(`Fetching details for event with ID: ${id}`);
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen w-full text-black">
      <Header />
      <div className="flex flex-col flex-1">
        <h1 className="text-4xl font-bold text-center my-6 text-white">{event.title}</h1>

        <div className="flex flex-1 flex-col lg:flex-row gap-6 px-6 pb-6 overflow-hidden">
          {/* Map Section */}
          <div className="flex-1 relative min-h-[300px] h-full w-full lg:h-auto rounded-2xl overflow-hidden shadow-xl">
            <div className='absolute top-0 left-0 w-full h-full '>
              <Map events={[event]} zoomIn={5} />
            </div>
          </div>


          {/* Info Section */}
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl overflow-auto flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
              <p className="text-gray-700 mb-6">{event.description}</p>

              {/* Host */}
              <div className="mb-6">
                <p className="font-medium text-gray-800 mb-1">Host:</p>
                <div className="flex items-center gap-3  border border-gray-600 w-fit px-2 py-2 rounded-full">
                  <img
                    src={event.host.avatar}
                    alt={event.host.fullName}
                    className="w-12 h-12 rounded-full border border-gray-600"
                  />
                  <div className='pr-4 flex justify-center flex-col items-center'>
                    <p className="text-lg font-medium">{event.host.fullName}</p>
                    <a
                      href={`/profile/${event.host._id}`}
                      className="text-[13px] text-blue-500 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {event.startTime} - {event.endTime}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-700">
                  <strong>Attendees:</strong> {event.attendees}
                </p>
              </div>
            </div>

            {/* Optional: Footer or CTA */}
            <div className="mt-8">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Join Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
