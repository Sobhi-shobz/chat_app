import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import {
  collection, addDoc, query, where,
  orderBy, serverTimestamp, onSnapshot
} from 'firebase/firestore';

export default function ChatRoom({ room, user, goBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("roomId", "==", room.id),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return unsub;
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        createdAt: serverTimestamp(),
        user: user.displayName,
        uid: user.uid,
        photo: user.photoURL,
        roomId: room.id,
      });
      setInput("");
    }
  };

  return (
    <div>
      <button onClick={goBack}>⬅ Back to Rooms</button>
      <h2>Room: {room.name}</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
