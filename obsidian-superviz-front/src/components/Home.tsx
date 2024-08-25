import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && room) {
      navigate(`/room/${room}`, { state: { name } });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full bg-gray-800 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Enter Room
        </h1>
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
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-300"
            >
              Room
            </label>
            <input
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600 focus:outline-none transition duration-300"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
