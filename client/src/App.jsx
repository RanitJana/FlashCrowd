import Map from "./components/Map"
import Event from "./components/Event"


export default function App() {

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white gap-5">
      <Map />
      <Event />
    </div>
    </>
  )

}

