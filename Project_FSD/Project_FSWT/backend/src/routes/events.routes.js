import { Router } from 'express';
import Event from '../models/Event.js';

const router = Router();

// List events with optional text search and pagination
router.get('/', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const query = q ? { $text: { $search: q } } : {};
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.max(parseInt(limit, 10) || 10, 1);

    const [items, total] = await Promise.all([
      Event.find(query)
        .sort({ startDate: 1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize),
      Event.countDocuments(query)
    ]);

    return res.json({ items, total, page: pageNum, limit: pageSize });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid id' });
  }
});

// Create event
router.post('/', async (req, res) => {
  try {
    const { title, description, imageUrl, startDate, endDate, location, capacity, price, categories } = req.body;
    if (!title || !startDate || !location) {
      return res.status(400).json({ message: 'title, startDate, and location are required' });
    }
    const event = await Event.create({
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      location,
      capacity,
      price,
      categories
    });
    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid data or id' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid id' });
  }
});


export default router;


