import React, { useState } from 'react';
import NameInput from './components/NameInput';
import RoomSelection from './components/RoomSelection';
import ChatRoom from './components/ChatRoom';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  if (!name) return <NameInput onSubmit={setName} />;
  if (!room) return <RoomSelection onRoomSelect={setRoom} />;
  return <ChatRoom name={name} room={room} onLeave={() => setRoom('')} />;
}

export default App;
