import Map from "../components/Map.jsx";
import Event from "../components/Event.jsx";
import AddEvent from "./AddEvent.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";
import LandingPage from "../components/Landing.jsx";
import SportsCarousel from "../components/RotatedItem.jsx";

export default function Home() {

    const events = useSelector((state) => state.event.events); // Fetch events from Redux store

    return (
        <>
            {/* Main screen: Header + Map + Events, fixed to screen height */}

            <div className="flex flex-col gap-5">

            <div className="flex flex-col h-screen overflow-hidden rounded-3xl shadow-lg">
                {/* Header */}
                <div className="shrink-0">
                    <Header />
                </div>

                <div>
                    <LandingPage/>
                </div>
                
            </div>

            <div>
                <SportsCarousel/>
            </div>

            </div>
            {/* Below-screen Add Event section */}
            
        </>
    );
}