import AddEvent from "./pages/AddEvent.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Route, Routes } from "react-router";
import SingleEvent from "./pages/SingleEvent.jsx";
import Notification from "./pages/Notification.jsx";
import SportsCarousel from "./components/RotatedItem.jsx";
import Footer from "./components/Footer.jsx";
import OtherProfile from "./pages/OtherProfile.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path={`/events/:id`} element={<SingleEvent />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="check" element={<SportsCarousel />} />
          <Route path="/otherprofile" element={<OtherProfile />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />

    </div>
  );
}
