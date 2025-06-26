import React, { useState, useEffect } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  return (
    <div className="App">
      <h1>💬 Firebase Chat</h1>
      {!user ? (
        <button onClick={handleLogin}>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName} <button onClick={handleLogout}>Logout</button></p>
          {!activeRoom ? (
            <RoomList onSelectRoom={setActiveRoom} />
          ) : (
            <ChatRoom room={activeRoom} user={user} goBack={() => setActiveRoom(null)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
