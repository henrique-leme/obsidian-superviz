import { VideoConference } from "@superviz/react-sdk";

function VideoCallConference() {
  const collaborationMode = {
    enabled: true,
  };

  return (
    <VideoConference
      participantType="host"
      collaborationMode={collaborationMode}
      enableRecording={true}
    />
  );
}

export default VideoCallConference;
