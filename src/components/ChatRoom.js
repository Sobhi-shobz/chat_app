import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

export default function ChatRoom({ name, room, onLeave }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const chatRef = ref(db, `rooms/${room}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      setChat(messages);
    });
  }, [room]);

  const sendMessage = () => {
    const msgRef = ref(db, `rooms/${room}`);
    push(msgRef, { name, text: message });
    setMessage('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Welcome to: <strong>{room}</strong></h2>
        <button onClick={onLeave}>Leave</button>
      </div>
      <div className="chat-body">
        {chat.map((m, i) => (
          <p key={i}><strong>{m.name}:</strong> {m.text}</p>
        ))}
      </div>
      <div className="chat-input">
        <input
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
