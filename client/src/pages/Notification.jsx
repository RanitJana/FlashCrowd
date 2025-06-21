import { useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      eventId: 101,
      title: "Tech Conference 2023",
      message: "New event created 2.5km from your location",
      distance: "2.5km",
      time: "10 mins ago",
      read: false,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      details: {
        date: "June 15, 2023",
        location: "Convention Center",
        description: "Annual tech conference featuring the latest innovations in software development and AI."
      }
    },
    // ... other notification objects ...
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? {...n, read: true} : n
    ));
    
    // Show event details
    setSelectedEvent(notification);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      <div className="min-h-screen from-gray-900 to-gray-800 text-white">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-300">
              {selectedEvent ? 'Event Details' : 'Notifications'}
            </h1>
            {!selectedEvent && unreadCount > 0 && (
              <span className="bg-indigo-600 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          {selectedEvent ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="mb-4 flex items-center text-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to notifications
              </button>
              
              {/* <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              /> */}
              {/* <Map/> */}
              <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <div className="flex items-center text-gray-600 mt-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> */}
                {selectedEvent.details.location} • {selectedEvent.distance} away
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg> */}
                {selectedEvent.details.date}
              </div>
              <p className="mt-4 text-gray-700">{selectedEvent.details.description}</p>
              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                Join Event
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="bg-blue-700 hover:bg-blue-900 transition-colors duration-200 cursor-pointer p-4 rounded-lg shadow-md flex items-start space-x-4 relative"
                >
                  {notification.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;