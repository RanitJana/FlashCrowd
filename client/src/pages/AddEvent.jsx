import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../features/event.slice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import toast from "react-hot-toast";
import Map from "../components/Map";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const AddEvent = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "music", // default type
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        dispatch(
          addEvent({
            title: form.title,
            description: form.description,
            position: coords,
            type: form.type,
          })
        );
        toast.success("Event added successfully!");
        // Reset form after submission
        setForm({ title: "", description: "", type: "music" });
      },
      (err) => {
        toast.error("Failed to get your location. Please allow location access.");
        // Log the error for debugging
        console.error(err);
      }
    );
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Event</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white shadow-xl rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 text-base"
          />

          <textarea
            placeholder="Event Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 text-base"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 text-base"
          >
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="tech">Tech</option>
            <option value="default">Other</option>
          </select>

          <button
            type="submit"
            className="w-full text-black bg-blue-600  py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit & Add Marker
          </button>
        </form>

        {/* Map */}
        <div className="w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-xl">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
