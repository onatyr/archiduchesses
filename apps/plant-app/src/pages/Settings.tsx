// pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import { useUser } from '@plantApp/src/context/UserContext';

const Settings: React.FC = () => {
  const { user, setUser } = useUser(); // Access the user and setUser from context
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
        email,
      });
      // Optionally, save this to localStorage or send to API
      localStorage.setItem('user', JSON.stringify({ ...user, name, email }));
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
