import AddEvent from "./pages/AddEvent.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addEvent" element={<AddEvent/>} />
    </Routes>
  );
}
