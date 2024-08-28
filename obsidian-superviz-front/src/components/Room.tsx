import { useParams, useLocation } from "react-router-dom";
import SuperVizProvider from "./SuperVizProvider";

interface RoomProps {
  supervizKey: string;
}

function Room({ supervizKey }: RoomProps) {
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

      <SuperVizProvider
        roomId={roomId!}
        userName={name}
        participantId={participantId}
        supervizKey={supervizKey}
      />
    </div>
  );
}

export default Room;
