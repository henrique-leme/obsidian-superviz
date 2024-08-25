import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SuperVizProvider from "./SuperVizProvider";

interface RoomProps {
  websocketUrl: string;
  supervizKey: string;
  defaultRoomId: string;
}

const Room: React.FC<RoomProps> = ({ supervizKey, defaultRoomId }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const { name } = location.state as { name: string };

  const currentRoomId = roomId || defaultRoomId;

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className="text-4xl mb-6">Welcome, {name}!</h1>
      </div>
      <SuperVizProvider
        supervizKey={supervizKey}
        roomId={currentRoomId}
        userName={name}
      />
    </div>
  );
};

export default Room;
