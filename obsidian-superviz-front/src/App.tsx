import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";

const App: React.FC = () => {
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
  const supervizKey = import.meta.env.VITE_SUPERVIZ_DEVELOPER_KEY as string;
  const defaultRoomId = import.meta.env.VITE_ROOM_ID as string;

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/room/:roomId"
            element={
              <Room
                websocketUrl={websocketUrl}
                supervizKey={supervizKey}
                defaultRoomId={defaultRoomId}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
