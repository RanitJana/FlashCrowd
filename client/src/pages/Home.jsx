import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";
import LandingPage from "../components/Landing.jsx";

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

                <div>
                    <LandingPage />
                </div>


            </div>


        </>
    );
}
