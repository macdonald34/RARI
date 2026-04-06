const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Member = require('./models/Member');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Create admin member
    const member = new Member({
      name: 'Admin User',
      email: 'admin@church.com',
      role: 'admin'
    });
    await member.save();

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const user = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      status: 'approved',
      memberId: member._id
    });
    await user.save();

    console.log('Admin user created: username: admin, password: admin123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();