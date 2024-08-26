import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createRoom, getRooms } from "../services/supervizApi";

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { name, participantId } = location.state as {
    name: string;
    participantId: string;
  };

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to fetch rooms.");
    }
  };

  const handleCreateRoom = async () => {
    try {
      const room = await createRoom(`Room for ${name}`);
      navigate(`/room/${room.id}`, { state: { name, participantId } });
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Failed to create room. Please try again.");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome, {name}!
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleCreateRoom}
          className="w-full p-3 bg-green-500 rounded-lg text-white hover:bg-green-600 focus:outline-none transition duration-300 mb-6"
        >
          Create New Room
        </button>
        <h3 className="text-xl text-white mb-4 text-center">
          Or Join an Existing Room:
        </h3>
        <ul className="space-y-2">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <li key={room.id}>
                <button
                  onClick={() =>
                    navigate(`/room/${room.id}`, {
                      state: { name, participantId },
                    })
                  }
                  className="w-full p-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 focus:outline-none transition duration-300"
                >
                  Join Room {room.name}
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">No rooms available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
