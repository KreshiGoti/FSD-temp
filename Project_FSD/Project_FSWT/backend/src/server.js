import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRouter from './routes/auth.routes.js';
import eventsRouter from './routes/events.routes.js';
import participantsRouter from './routes/participants.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send("Backend is running!");
});


app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/participants', participantsRouter);

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_db';
const port = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();


