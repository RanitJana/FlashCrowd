import AddEvent from "./pages/AddEvent.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Route, Routes } from "react-router";
import SingleEvent from "./pages/SingleEvent.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path={`/events/:id`} element={<SingleEvent />} />
    </Routes>
  );
}
