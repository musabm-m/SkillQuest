import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, tasksCompleted, sessionTime }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server error:', errorText);
      alert('Update failed');
      return;
    }

    const data = await response.json();
    console.log('✅ Success:', data);
    alert('Update successful');
  } catch (err) {
    console.error('❌ Network error:', err);
    alert('Update failed');
  }
};


  const resetUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const data = await response.json();
      setUserData(data.user);
      alert('User reset!');
    } catch (err) {
      console.error('Reset failed:', err);
      alert('Reset failed');
    }
  };

  return (
    <div>
      <h1>Update User Stats</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Tasks Completed" value={tasksCompleted} onChange={e => setTasksCompleted(Number(e.target.value))} />
      <input type="number" placeholder="Session Time" value={sessionTime} onChange={e => setSessionTime(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={resetUser}>Reset Progress</button>

      {userData && (
        <div>
          <h3>Current User Data</h3>
          <p>Name: {userData.name}</p>
          <p>Tasks Completed: {userData.tasksCompleted}</p>
          <p>Session Time: {userData.sessionTime}</p>
          <p>Badges: {userData.badges.join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
