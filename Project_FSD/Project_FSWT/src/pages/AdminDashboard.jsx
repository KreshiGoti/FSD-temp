import React, { useEffect, useMemo, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('past');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      const json = await res.json();
      setEvents(json.items || []);
    } catch (e) {
      setError('Failed to load events');
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const now = useMemo(() => new Date(), []);
  const statusOf = (evt) => {
    const start = evt.startDate ? new Date(evt.startDate) : null;
    if (start && start > now) return 'upcoming';
    return 'past';
  };

  const filtered = useMemo(() => {
    if (activeTab === 'live') return events.filter(() => false);
    if (activeTab === 'upcoming') return events.filter((e) => statusOf(e) === 'upcoming');
    return events.filter((e) => statusOf(e) === 'past');
  }, [events, activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMessage('Event deleted');
      await loadEvents();
    } catch (e) {
      setError(e.message);
    }
  };

  const startEdit = (evt) => {
    setEditing({ ...evt });
    setIsModalOpen(true);
  };

  const submitEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const body = {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      startDate: data.startDate,
      endDate: data.endDate || undefined,
      location: data.location,
      capacity: data.capacity ? Number(data.capacity) : 0,
      price: data.price ? Number(data.price) : 0,
      categories: data.category ? [data.category] : []
    };
    try {
      let res;
      if (editing && editing._id) {
        res = await fetch(`${API_BASE}/api/events/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        res = await fetch(`${API_BASE}/api/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      if (!res.ok) throw new Error('Save failed');
      setMessage(editing ? 'Event updated' : 'Event created');
      setIsModalOpen(false);
      setEditing(null);
      e.target.reset();
      await loadEvents();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <section className="admin-events-header">
        <div className="admin-events-header-inner">
          <div>
            <h1 className="admin-events-title">Events Management</h1>
            <p className="admin-events-subtitle">Create and manage campus events</p>
          </div>
          <button className="create-event-btn" onClick={() => { setEditing(null); openModal(); }}>
            <span className="plus">+</span> Create Event
          </button>
          </div>
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab==='live'?'active':''}`} onClick={()=>setActiveTab('live')}>Live Events</button>
          <button className={`admin-tab ${activeTab==='upcoming'?'active':''}`} onClick={()=>setActiveTab('upcoming')}>Upcoming Events</button>
          <button className={`admin-tab ${activeTab==='past'?'active':''}`} onClick={()=>setActiveTab('past')}>Past Events</button>
        </div>
      </section>

      <section className="admin-table-section">
        <div className="admin-table">
          <div className="admin-table-row admin-table-head">
            <div className="col event">Event</div>
            <div className="col date">Date</div>
            <div className="col location">Location</div>
            <div className="col participants">Participants</div>
            <div className="col status">Status</div>
            <div className="col actions">Actions</div>
                </div>
          {filtered.map((evt) => (
            <div key={evt._id} className="admin-table-row">
              <div className="col event">
                <div className="avatar">{(evt.title || 'E').slice(0,2).toUpperCase()}</div>
                <div>
                  <div className="event-name">{evt.title}</div>
                  <div className="event-type">{(evt.categories && evt.categories[0]) || 'general'}</div>
                </div>
              </div>
              <div className="col date">{evt.startDate ? new Date(evt.startDate).toLocaleString() : '-'}</div>
              <div className="col location">{evt.location || '-'}</div>
              <div className="col participants">{Array.isArray(evt.attendees) ? evt.attendees.length : 0}</div>
              <div className="col status"><span className="badge">{statusOf(evt)}</span></div>
              <div className="col actions">
                <button className="link" onClick={() => startEdit(evt)}>Edit</button>
                <button className="link danger" onClick={() => handleDelete(evt._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {message && <div className="alert success" style={{maxWidth:'1100px',margin:'10px auto',padding:'10px 12px',borderRadius:'8px'}}> {message} </div>}
        {error && <div className="alert error" style={{maxWidth:'1100px',margin:'10px auto',padding:'10px 12px',borderRadius:'8px'}}> {error} </div>}
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editing ? 'Edit Event' : 'Create New Event'}</div>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form className="event-form" onSubmit={submitEvent}>
              <div className="form-row">
                <div className="form-group">
                  <label>Event Title</label>
                  <input name="title" defaultValue={editing?.title || ''} type="text" placeholder="Enter event title" required />
            </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" defaultValue={(editing?.categories && editing.categories[0]) || ''}>
                    <option value="" disabled>Select category</option>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Entertainment</option>
                  </select>
            </div>
          </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Enter event description" defaultValue={editing?.description || ''}></textarea>
            </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input name="startDate" type="datetime-local" defaultValue={editing?.startDate ? new Date(editing.startDate).toISOString().slice(0,16) : ''} required />
            </div>
                <div className="form-group">
                  <label>End Date (optional)</label>
                  <input name="endDate" type="datetime-local" defaultValue={editing?.endDate ? new Date(editing.endDate).toISOString().slice(0,16) : ''} />
          </div>
        </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input name="location" type="text" placeholder="Enter event location" defaultValue={editing?.location || ''} required />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input name="capacity" type="number" placeholder="Enter maximum capacity" defaultValue={editing?.capacity ?? 0} min="0" />
                    </div>
                  </div>
              <div className="form-group">
                <label>Event Image</label>
                <input name="imageUrl" type="url" placeholder="https://example.com/image.jpg" defaultValue={editing?.imageUrl || ''} />
                <div className="dropzone" style={{marginTop:'8px'}}>Drag and drop an image or paste URL above
                  <div className="hint">Recommended size: 800x400 pixels</div>
                </div>
              </div>
              <div className="form-footer">
                <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn primary" disabled={submitting}>{submitting ? 'Saving...' : (editing ? 'Save Changes' : 'Create Event')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
