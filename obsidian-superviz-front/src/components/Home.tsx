import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createParticipant } from "../services/supervizApi";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para gerar ou recuperar o participantId do localStorage
  const getOrCreateParticipantId = () => {
    let storedParticipantId = localStorage.getItem("participantId");

    if (!storedParticipantId) {
      storedParticipantId = uuidv4(); // Gera um novo participantId
      localStorage.setItem("participantId", storedParticipantId); // Salva no localStorage
    }

    return storedParticipantId;
  };

  // Função para criar o participante
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      setError(null);
      const newParticipantId = getOrCreateParticipantId(); // Recupera ou cria o participantId
      await createParticipant(name, newParticipantId); // Cria o participante na API
      navigate(`/rooms`, { state: { name, participantId: newParticipantId } }); // Redireciona para a página de rooms
    } catch (err) {
      console.error("Error creating participant:", err);
      setError("Failed to create participant. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Enter Your Name
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600 focus:outline-none transition duration-300"
            >
              Confirm Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
