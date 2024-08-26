import React from "react";
import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";
import { v4 as uuidv4 } from "uuid";
import MarkdownEditor from "./MarkdownEditor";

interface SuperVizProviderProps {
  roomId: string;
  userName: string;
  supervizKey: string;
}

const SuperVizProvider: React.FC<SuperVizProviderProps> = ({
  roomId,
  userName,
  supervizKey,
}) => {
  const userId = uuidv4();
  const groupId = uuidv4();

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
    </SuperVizRoomProvider>
  );
};

export default SuperVizProvider;
