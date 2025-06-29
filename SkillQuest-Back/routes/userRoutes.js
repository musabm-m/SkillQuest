const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Update user progress
router.post('/update', async (req, res) => {
  const { name, tasksCompleted, sessionTime } = req.body;

  console.log("🔔 Received update POST:", req.body);

  let user = await User.findOne({ name });

  if (!user) {
    user = new User({ name, tasksCompleted, badges: [], sessionTime });
  } else {
    user.tasksCompleted += tasksCompleted;
    user.sessionTime += sessionTime;
  }

  if (user.tasksCompleted >= 10 && !user.badges.includes('Achiever')) {
    user.badges.push('Achiever');
  }
  if (user.tasksCompleted < 10 && !user.badges.includes('Trainee')) {
    user.badges.push('Trainee');
  }

  await user.save();
  res.json(user);
});

// Reset user progress
router.post('/reset', async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.tasksCompleted = 0;
    user.sessionTime = 0;
    user.badges = [];

    await user.save();
    res.json({ message: 'User data reset', user });
  } catch (err) {
    res.status(500).json({ error: 'Reset failed', details: err.message });
  }
});

module.exports = router;
