const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// ✅ Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String
});
const Student = mongoose.model('Student', studentSchema);

// ✅ API Routes

// Get all students
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add student
app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: 'Student added successfully!' });
});

// Edit student
app.put('/api/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Student updated successfully!' });
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully!' });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
