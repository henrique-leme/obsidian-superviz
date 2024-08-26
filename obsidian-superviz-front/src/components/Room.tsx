import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SuperVizProvider from "./SuperVizProvider";

interface RoomProps {
  supervizKey: string;
}

const Room: React.FC<RoomProps> = ({ supervizKey }) => {
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

      {/* Passa as informações para o SuperVizProvider */}
      <SuperVizProvider
        roomId={roomId!} // Passa o ID da sala
        userName={name} // Nome do usuário
        participantId={participantId} // ID do participante
        supervizKey={supervizKey} // Chave de desenvolvedor do SuperViz
      />
    </div>
  );
};

export default Room;
