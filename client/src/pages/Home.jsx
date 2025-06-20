import Map from "../components/Map.jsx";
import Event from "../components/Event.jsx";
import AddEvent from "./AddEvent.jsx";
import Header from "../components/Header.jsx";

export default function Home() {
    return (
        <>
            <Header />
            <div className="w-full h-screen flex flex-col lg:flex-row gap-5">
                <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row gap-5 p-5">

                    {/* Map Section */}
                    <div className="h-3/5 lg:h-full lg:w-2/3 overflow-auto">
                        <div className="w-full h-full shadow-lg ">
                            <Map />
                        </div>
                    </div>

                    {/* Event Section */}
                    <div className="h-2/5 lg:h-full lg:w-1/3 overflow-auto">
                        <div className="w-full h-full shadow-lg ">
                            <Event />
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Event Section */}
            <div className="w-full h-1/5 p-5">
                <div className="w-full h-full shadow-lg bg-white rounded-lg">
                    <AddEvent />
                </div>
            </div>
        </>
    );
}
