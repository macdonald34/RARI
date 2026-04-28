const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes with error handling
try {
  console.log('Loading auth routes...');
  app.use('/api/auth', require('./routes/auth'));
  console.log('✓ Auth routes loaded');
} catch (err) {
  console.error('✗ Error loading auth routes:', err.message);
}

try {
  console.log('Loading members routes...');
  app.use('/api/members', require('./routes/members'));
  console.log('✓ Members routes loaded');
} catch (err) {
  console.error('✗ Error loading members routes:', err.message);
}

try {
  console.log('Loading events routes...');
  app.use('/api/events', require('./routes/events'));
  console.log('✓ Events routes loaded');
} catch (err) {
  console.error('✗ Error loading events routes:', err.message);
}

try {
  console.log('Loading donations routes...');
  app.use('/api/donations', require('./routes/donations'));
  console.log('✓ Donations routes loaded');
} catch (err) {
  console.error('✗ Error loading donations routes:', err.message);
}

try {
  console.log('Loading attendance routes...');
  app.use('/api/attendance', require('./routes/attendance'));
  console.log('✓ Attendance routes loaded');
} catch (err) {
  console.error('✗ Error loading attendance routes:', err.message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\n✅ Server running on port ${PORT}`));