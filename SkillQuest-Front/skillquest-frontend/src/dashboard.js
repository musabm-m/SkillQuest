import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [user, setUser] = useState(null);

  const submitProgress = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/update', {
        name,
        tasksCompleted: Number(tasks),
        sessionTime: Number(sessionTime)
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SkillQuest Dashboard</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Tasks Completed" type="number" value={tasks} onChange={e => setTasks(e.target.value)} /><br />
      <input placeholder="Session Time (min)" type="number" value={sessionTime} onChange={e => setSessionTime(e.target.value)} /><br />
      <button onClick={submitProgress}>Submit</button>

      {user && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results for {user.name}</h2>
          <p>Tasks Completed: {user.tasksCompleted}</p>
          <p>Session Time: {user.sessionTime} minutes</p>
          <p>Badges: {user.badges.join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
}
