import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const events = [
    { name: 'Football Match', position: [51.51, -0.1] },
    { name: 'Music Party', position: [51.507, -0.08] },
    { name: 'Tech Meetup', position: [51.52, -0.11] },
];

const FlyToUser = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 13, { duration: 2 });
        }
    }, [position, map]);
    return null;
};

const getDistance = (userPos, eventPos) => {
    const from = L.latLng(userPos[0], userPos[1]);
    const to = L.latLng(eventPos[0], eventPos[1]);
    return (from.distanceTo(to) / 1000).toFixed(2); // km
};

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error("Geolocation error:", err);
            }
        );
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {userLocation && <FlyToUser position={userLocation} />}

            {userLocation && (
                <Marker position={userLocation}>
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {userLocation &&
                events.map((event, i) => {
                    const distance = getDistance(userLocation, event.position);
                    return (
                        <Marker key={i} position={event.position}>
                            <Popup>
                                <strong>{event.name}</strong><br />
                                Distance: {distance} km from you
                            </Popup>
                        </Marker>
                    );
                })}
        </MapContainer>
    );
};

export default Map;























// CreateEvent.jsx
// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const defaultIcon = new L.Icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });

// const CreateEvent = () => {
//     const [userLocation, setUserLocation] = useState(null);
//     const [eventData, setEventData] = useState({
//         title: '',
//         description: '',
//     });
//     const [eventMarker, setEventMarker] = useState(null);

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setUserLocation([position.coords.latitude, position.coords.longitude]);
//             },
//             (error) => {
//                 console.error('Location fetch error:', error);
//             }
//         );
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prev) => ({ ...prev, [name]: value }));
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (userLocation && eventData.title && eventData.description) {
//             setEventMarker({
//                 ...eventData,
//                 position: userLocation,
//             });
//             setEventData({ title: '', description: '' }); // Reset form
//         }
//     };

//     return (
//         <div className="flex flex-col md:flex-row gap-6 p-4">
//             {/* Form */}
//             <div className="md:w-1/3 w-full bg-white rounded-2xl shadow-md p-6">
//                 <h2 className="text-2xl font-semibold mb-4">📍 Create Event</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block font-medium mb-1">Event Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={eventData.title}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block font-medium mb-1">Description</label>
//                         <textarea
//                             name="description"
//                             value={eventData.description}
//                             onChange={handleChange}
//                             rows="3"
//                             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
//                         disabled={!userLocation}
//                     >
//                         Create Event
//                     </button>
//                 </form>
//                 {!userLocation && (
//                     <p className="text-sm text-red-500 mt-2">Fetching your location...</p>
//                 )}
//             </div>

//             {/* Map */}
//             <div className="md:w-2/3 w-full">
//                 <MapContainer
//                     center={userLocation || [51.505, -0.09]}
//                     zoom={13}
//                     scrollWheelZoom={true}
//                     style={{ height: '500px', width: '100%' }}
//                 >
//                     <TileLayer
//                         attribution='&copy; OpenStreetMap contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />

//                     {eventMarker && (
//                         <Marker position={eventMarker.position} icon={defaultIcon}>
//                             <Popup>
//                                 <strong>{eventMarker.title}</strong><br />
//                                 {eventMarker.description}
//                             </Popup>
//                         </Marker>
//                     )}
//                 </MapContainer>
//             </div>
//         </div>
//     );
// };

// export default CreateEvent;

