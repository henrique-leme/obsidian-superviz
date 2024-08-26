import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SuperVizProvider from "./SuperVizProvider";

interface RoomProps {
  supervizKey: string;
}

const Room: React.FC<RoomProps> = ({ supervizKey }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const { name, participantId } = location.state as {
    name: string;
    participantId: string;
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className="text-4xl mb-6">Welcome, {name}!</h1>
      </div>

      {/* Passes the information to SuperVizProvider */}
      <SuperVizProvider
        roomId={roomId!} // Passes the room ID
        userName={name} // User's name
        participantId={participantId} // Participant ID
        supervizKey={supervizKey} // SuperViz developer key
      />
    </div>
  );
};

export default Room;
