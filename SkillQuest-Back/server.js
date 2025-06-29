const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB has been successfully connected!"))
  .catch(err => console.log("Mongo Error:", err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const User = require('./models/User');

app.get('/api/test-create', async (req, res) => {
  try {
    const newUser = await User.create({
      name: "TestInsert",
      tasksCompleted: 99,
      sessionTime: 99,
      badges: ["DebugBadge"]
    });
    res.json({ message: "Inserted!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

