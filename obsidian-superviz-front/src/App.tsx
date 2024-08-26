import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import Rooms from "./components/Rooms";

const App: React.FC = () => {
  const supervizKey = import.meta.env.VITE_SUPERVIZ_DEVELOPER_KEY as string;

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />{" "}
          <Route
            path="/room/:roomId"
            element={<Room supervizKey={supervizKey} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
