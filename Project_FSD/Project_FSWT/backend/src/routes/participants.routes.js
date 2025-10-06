import { Router } from 'express';
import Participant from '../models/Participant.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

const router = Router();

// Register a user to an event
router.post('/register', async (req, res) => {
  try {
    const { eventId, userId, name, email, phone, numberOfTickets } = req.body;
    if (!eventId || !userId) return res.status(400).json({ message: 'eventId and userId are required' });

    const [event, user] = await Promise.all([
      Event.findById(eventId),
      User.findById(userId)
    ]);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Block registration for past events
    const now = new Date();
    const start = event.startDate ? new Date(event.startDate) : null;
    const end = event.endDate ? new Date(event.endDate) : null;
    const isPast = (end && now > end) || (start && !end && now > start);
    if (isPast) {
      return res.status(409).json({ message: 'Event has already ended' });
    }

    // Enforce capacity by summing tickets of active registrations
    let requested = Number.isFinite(Number(numberOfTickets)) ? Number(numberOfTickets) : 1;
    if (requested < 1) requested = 1;
    if (requested > 10) requested = 10;

    if (event.capacity) {
      const aggregates = await Participant.aggregate([
        { $match: { event: event._id, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$tickets', 1] } } } }
      ]);
      const taken = aggregates.length ? aggregates[0].total : 0;
      if (taken + requested > event.capacity) {
        return res.status(409).json({ message: 'Not enough seats available' });
      }
    }

    const participant = await Participant.findOneAndUpdate(
      { event: eventId, user: userId },
      {
        $set: {
          status: 'registered',
          name: name || user.name,
          email: email || user.email,
          phone: phone || undefined,
          tickets: requested
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json(participant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Unregister a user from an event
router.post('/unregister', async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    if (!eventId || !userId) return res.status(400).json({ message: 'eventId and userId are required' });

    const participant = await Participant.findOneAndUpdate(
      { event: eventId, user: userId },
      { status: 'cancelled' },
      { new: true }
    );
    if (!participant) return res.status(404).json({ message: 'Registration not found' });

    return res.json(participant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// List participants for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await Participant.find({ event: eventId, status: { $ne: 'cancelled' } })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    return res.json({ items: participants });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


