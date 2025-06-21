import Map from "../components/Map.jsx";
import Event from "../components/Event.jsx";
import AddEvent from "./AddEvent.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";

export default function Home() {

    const events = useSelector((state) => state.event.events); // Fetch events from Redux store

    return (
        <>
            {/* Main screen: Header + Map + Events, fixed to screen height */}
            <div className="flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <div className="shrink-0">
                    <Header />
                </div>

                {/* Map + Event layout */}
                <div className="flex flex-1 flex-col lg:flex-row gap-5 p-5 overflow-hidden">
                    {/* Map Section */}
                    <div className="lg:w-2/3 h-1/2 lg:h-full overflow-hidden">
                        <div className="w-full h-full shadow-lg rounded-lg overflow-hidden">
                            <Map events={events} />
                        </div>
                    </div>

                    {/* Event Section */}
                    <div className="lg:w-1/3 h-1/2 lg:h-full overflow-hidden">
                        <div className="w-full h-full shadow-lg rounded-lg overflow-auto">
                            <Event />
                        </div>
                    </div>
                </div>
            </div>

            {/* Below-screen Add Event section */}
            <div className="w-full p-5">
                <div className="w-full shadow-lg bg-white rounded-lg">
                    <AddEvent />
                </div>
            </div>
        </>
    );
}
