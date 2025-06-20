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
