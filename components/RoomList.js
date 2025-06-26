import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function RoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), snapshot => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const createRoom = async () => {
    if (newRoom.trim()) {
      await addDoc(collection(db, "rooms"), { name: newRoom });
      setNewRoom("");
    }
  };

  return (
    <div>
      <h2>Select or Create Room</h2>
      <input
        value={newRoom}
        onChange={e => setNewRoom(e.target.value)}
        placeholder="New room name"
      />
      <button onClick={createRoom}>Create</button>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <button onClick={() => onSelectRoom(room)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
