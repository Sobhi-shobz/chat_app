import React, { useState } from 'react';

export default function RoomSelection({ onRoomSelect }) {
  const [room, setRoom] = useState("");

  const enterRoom = () => {
    if (room.trim()) onRoomSelect(room);
  };

  return (
    <div className="center-screen">
      <h2>Enter Room Name:</h2>
      <input value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={enterRoom}>Enter Chat</button>
    </div>
  );
}
