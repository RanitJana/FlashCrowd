import AddEvent from "./pages/AddEvent.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Route, Routes } from "react-router";
import SingleEvent from "./pages/SingleEvent.jsx";
import Notification from "./pages/Notification.jsx";
import SportsCarousel from "./components/RotatedItem.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path={`/events/:id`} element={<SingleEvent />} />
      <Route path="/add-event" element={<AddEvent />} />
      <Route path="/notification" element={<Notification/>} />
      <Route path="check" element={
      <SportsCarousel />
      } />
      {/* Add more routes as needed */}
    </Routes>
  );
}
