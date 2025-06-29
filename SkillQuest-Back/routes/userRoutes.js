const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/update', async (req, res) => {
  const { name, tasksCompleted, sessionTime } = req.body;

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

  await user.save();
  res.json(user);
});

module.exports = router;
