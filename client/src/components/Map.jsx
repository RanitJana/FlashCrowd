import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default marker setup
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const events = [
    { name: 'Football Match', position: [51.51, -0.1], type: 'sports' },
    { name: 'Music Festival', position: [51.507, -0.08], type: 'music' },
    { name: 'Tech Conference', position: [51.52, -0.11], type: 'tech' },
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

const getEventIcon = (type) => {
    const colorMap = {
        sports: 'red',
        music: 'violet',
        tech: 'blue',
        default: 'green'
    };

    const color = colorMap[type] || colorMap.default;

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
                setLoading(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 z-[1000] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
                        <p className="text-gray-700 font-medium">Finding your location...</p>
                    </div>
                </div>
            )}

            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {userLocation && <FlyToUser position={userLocation} />}

                {userLocation && (
                    <Marker position={userLocation} icon={defaultIcon}>
                        <Popup className="font-medium">
                            <div className="flex items-center">
                                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                <span>Your Location</span>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {userLocation &&
                    events.map((event, i) => {
                        const distance = getDistance(userLocation, event.position);
                        return (
                            <Marker
                                key={i}
                                position={event.position}
                                icon={getEventIcon(event.type)}
                            >
                                <Popup className="font-medium min-w-[200px]">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">{event.name}</h3>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {distance} km from you
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {event.type} event
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
            </MapContainer>

            {/* <div className="absolute bottom-4 left-4 z-[1000] bg-white px-3 py-2 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span>You</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        <span>Sports</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-violet-500 rounded-full mr-1"></div>
                        <span>Music</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span>Tech</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Map;