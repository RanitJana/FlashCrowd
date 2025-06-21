import { useNavigate } from 'react-router';

export default function EventCard({ event }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`, { state: { event } });
    }

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                    <p className="text-gray-600 text-sm">{event.location}</p>
                    <p className="text-gray-500 text-sm">
                        {event.startTime} - {event.endTime}
                    </p>
                </div>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
                {event.attendees.toLocaleString()} attendees
            </div>

            <button
                onClick={handleClick}
                className="mt-3 w-full hover:cursor-pointer bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                View Details
            </button>
        </div>
    )
}