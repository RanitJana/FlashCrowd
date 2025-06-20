import Map from "./components/Map";
import Event from "./components/Event";

export default function App() {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row gap-5">
      {/* Map Section */}
      <div className="h-full lg:h-full lg:w-2/3 overflow-auto">
        <div className="w-full h-full shadow-lg ">
          <Map />
        </div>
      </div>

      {/* Event Section */}
      <div className="h-full lg:h-full lg:w-1/3 overflow-auto">
        <div className="w-full h-full shadow-lg ">
          <Event />
        </div>
      </div>
    </div>
  );
}
