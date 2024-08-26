import { VideoConference } from "@superviz/react-sdk";

function VideoCallConference() {
  const collaborationMode = {
    enabled: false,
  };

  return (
    <VideoConference
      participantType="host"
      collaborationMode={collaborationMode}
    />
  );
}

export default VideoCallConference;
