const Attendance = require('../models/Attendance');

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('member event');
    res.json(attendance);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.markAttendance = async (req, res) => {
  const { member, event, status } = req.body;
  try {
    const attendance = new Attendance({ member, event, status });
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).send('Server error');
  }
};