import React, { useEffect } from "react";
import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";
import MarkdownEditor from "./MarkdownEditor";
import VideoCallConference from "./VideoConference";

interface SuperVizProviderProps {
  roomId: string;
  userName: string;
  participantId: string;
  supervizKey: string;
}

// Definindo o tipo manualmente com base na estrutura do participante
interface Participant {
  id: string;
  name?: string; // O nome pode ser opcional
}

function SuperVizProvider({
  roomId,
  userName,
  participantId,
  supervizKey,
}: SuperVizProviderProps) {
  const groupId = roomId;

  const onParticipantJoined = (participant: Participant) => {
    console.log("Participant joined", participant);
  };

  const onParticipantListUpdated = (participantList: Participant[]) => {
    console.log("Participant list updated", participantList);
  };

  useEffect(() => {
    // Lógica adicional, se necessário
  }, []);

  return (
    <SuperVizRoomProvider
      developerKey={supervizKey}
      roomId={roomId}
      participant={{
        id: participantId,
        name: userName, // Presume-se que o nome do usuário sempre será fornecido
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
    </SuperVizRoomProvider>
  );
}

export default SuperVizProvider;
