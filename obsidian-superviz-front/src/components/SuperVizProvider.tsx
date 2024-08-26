import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";
import { v4 as uuidv4 } from "uuid";
import MarkdownEditor from "./MarkdownEditor";
import VideoCallConference from "./VideoConference";

interface SuperVizProviderProps {
  roomId: string;
  userName: string;
  supervizKey: string;
}

function SuperVizProvider({
  roomId,
  userName,
  supervizKey,
}: SuperVizProviderProps) {
  const userId = uuidv4();
  const groupId = uuidv4();

  console.log(userId, groupId, supervizKey);

  return (
    <SuperVizRoomProvider
      developerKey={supervizKey}
      roomId={roomId}
      participant={{
        id: userId,
        name: userName,
      }}
      group={{
        id: groupId,
        name: `group_${groupId.substring(0, 6)}`,
      }}
    >
      <Realtime />
      <MarkdownEditor userName={userName} />
      <VideoCallConference />
    </SuperVizRoomProvider>
  );
}

export default SuperVizProvider;
