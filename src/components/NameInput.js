import React, { useState } from 'react';

export default function NameInput({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) onSubmit(name);
  };

  return (
    <div className="center-screen">
      <h2>Enter Your Name To Join</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit}>Join</button>
    </div>
  );
}
