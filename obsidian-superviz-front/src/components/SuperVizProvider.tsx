import { useState } from "react";
import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";
import MarkdownEditor from "./MarkdownEditor";
import VideoCallConference from "./VideoConference";
import RecordingOptionsPopup from "./RecordOptions";

interface SuperVizProviderProps {
  roomId: string;
  userName: string;
  participantId: string;
  supervizKey: string;
}

function SuperVizProvider({
  roomId,
  userName,
  participantId,
  supervizKey,
}: SuperVizProviderProps) {
  const [showRecordingOptions, setShowRecordingOptions] = useState(false);

  const toggleRecordingOptions = () => {
    setShowRecordingOptions((prev) => !prev);
  };
  console.log("RoomId:" + roomId);

  return (
    <SuperVizRoomProvider
      developerKey={supervizKey}
      roomId={roomId}
      participant={{
        id: participantId,
        name: userName,
      }}
      group={{
        id: roomId,
        name: `group_${roomId.substring(0, 6)}`,
      }}
    >
      <Realtime channelName={`text-channel-${roomId}`} />
      <MarkdownEditor
        userName={userName}
        channelName={`text-channel-${roomId}`}
      />
      <VideoCallConference />
      <button
        onClick={toggleRecordingOptions}
        className="fixed bottom-16 right-8 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-lg"
      >
        <span>≡</span>
      </button>
      {showRecordingOptions && (
        <RecordingOptionsPopup
          roomId={roomId}
          onClose={toggleRecordingOptions}
        />
      )}
    </SuperVizRoomProvider>
  );
}

export default SuperVizProvider;
