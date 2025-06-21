import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../features/event.slice.js";
import L from "leaflet";
import toast from "react-hot-toast";
import Map from "../components/Map";
import Header from "../components/Header";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const AddEvent = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "music",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        toast.success("Event added successfully!", {
          position: "bottom-center",
          style: {
            background: "#4BB543",
            color: "#fff",
          },
        });
        setForm({ title: "", description: "", type: "music" });
        setIsSubmitting(false);
      },
      (err) => {
        toast.error("Failed to get your location. Please allow location access.", {
          position: "bottom-center",
        });
        console.error(err);
        setIsSubmitting(false);
      }
    );
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Create a New Event</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill in the details below to add your event to the map
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Map Section */}
            <div className="w-full lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white">
              <div className="h-full relative">
                <Map events={events} />

              </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 h-[500px]">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-white h-full flex flex-col"
              >
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Event Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Music Festival"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Event Description</label>
                  <textarea
                    placeholder="Tell people what to expect at your event..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Event Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "music", label: "🎵 Music", color: "bg-purple-100 text-purple-800" },
                      { value: "sports", label: "⚽ Sports", color: "bg-green-100 text-green-800" },
                      { value: "tech", label: "💻 Tech", color: "bg-blue-100 text-blue-800" },
                      { value: "default", label: "📌 Other", color: "bg-gray-100 text-gray-800" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setForm({ ...form, type: option.value })}
                        className={`rounded-xl py-2 px-3 text-sm font-medium transition duration-200 ${form.type === option.value
                          ? `${option.color} ring-2 ring-offset-2 ring-indigo-500`
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-white transition duration-200 ${isSubmitting
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Add Event to Map"
                    )}
                  </button>
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      By submitting, you agree to place a marker at your current location
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;