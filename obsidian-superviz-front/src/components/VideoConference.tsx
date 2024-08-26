import { VideoConference } from "@superviz/react-sdk";

function VideoCallConference() {
  const collaborationMode = {
    enabled: true,
  };

  return (
    <VideoConference
      participantType="host"
      collaborationMode={collaborationMode}
    />
  );
}

export default VideoCallConference;
