import { useEffect, useState } from "react";
import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";
import MarkdownEditor from "./MarkdownEditor";
import VideoCallConference from "./VideoConference";
import RecordingOptionsPopup from "./RecordOptions"; // Importing RecordingOptionsPopup

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
  const groupId = roomId;

  const [showRecordingOptions, setShowRecordingOptions] = useState(false);

  const onParticipantJoined = (participant: { id: string; name?: string }) => {
    console.log("Participant joined", participant);
  };

  const onParticipantListUpdated = (
    participantList: { id: string; name?: string }[]
  ) => {
    console.log("Participant list updated", participantList);
  };

  useEffect(() => {}, []);

  const toggleRecordingOptions = () => {
    setShowRecordingOptions((prev) => !prev);
  };

  return (
    <SuperVizRoomProvider
      developerKey={supervizKey}
      roomId={roomId}
      participant={{
        id: participantId,
        name: userName,
      }}
      group={{
        id: groupId,
        name: `group_${groupId.substring(0, 6)}`,
      }}
      onParticipantJoined={onParticipantJoined}
      onParticipantListUpdated={onParticipantListUpdated}
    >
      <Realtime />
      <MarkdownEditor userName={userName} />
      <VideoCallConference />

      {/* Button to open recording options */}
      <button
        onClick={toggleRecordingOptions}
        className="fixed bottom-16 right-8 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-lg"
      >
        <span>≡</span>
      </button>

      {/* Display of the recording options popup */}
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
