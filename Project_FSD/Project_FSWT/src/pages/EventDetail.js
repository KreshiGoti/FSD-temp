import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
  const [takenTickets, setTakenTickets] = useState(0);

  const demoEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Join us for a day of cutting-edge technology discussions, networking, and innovation. Learn from industry experts about the latest trends in AI, blockchain, and cloud computing.",
      date: "Friday, March 15, 2024",
      time: "09:00",
      venue: "Convention Center, Downtown",
      seats: "150 seats available",
      totalSeats: 200,
      takenSeats: 50,
      category: "Technology",
      price: "Free",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      description: "Master the art of digital marketing with hands-on workshops covering SEO, social media strategies, content marketing, and analytics. Perfect for marketers looking to enhance their skills.",
      date: "Wednesday, March 20, 2024",
      time: "10:00",
      venue: "Business Center, Midtown",
      seats: "75 seats available",
      totalSeats: 100,
      takenSeats: 25,
      category: "Business",
      price: "$99",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Music & Arts Festival",
      description: "Experience a weekend filled with live music, art exhibitions, and creative workshops. Join us for an unforgettable celebration of music and arts featuring local and international artists.",
      date: "Saturday, March 25, 2024",
      time: "12:00",
      venue: "City Park, Central",
      seats: "500 seats available",
      totalSeats: 600,
      takenSeats: 100,
      category: "Entertainment",
      price: "$45",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      description: "Watch innovative startups pitch their ideas to investors and industry experts. This competition showcases the next generation of entrepreneurs and their groundbreaking ideas.",
      date: "Tuesday, March 28, 2024",
      time: "14:00",
      venue: "Innovation Hub, Tech District",
      seats: "200 seats available",
      totalSeats: 250,
      takenSeats: 50,
      category: "Business",
      price: "$25",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop"
    },
    {
      id: 5,
      title: "AI & Machine Learning Conference",
      description: "Explore the latest developments in artificial intelligence and machine learning. Join leading researchers and practitioners as they share insights into the future of AI technology.",
      date: "Thursday, April 5, 2024",
      time: "09:30",
      venue: "Conference Center, University",
      seats: "300 seats available",
      totalSeats: 400,
      takenSeats: 100,
      category: "Technology",
      price: "$150",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Food & Wine Tasting Event",
      description: "Indulge in exquisite food and wine pairings from local restaurants and wineries. Experience culinary excellence with expert sommeliers and renowned chefs.",
      date: "Sunday, April 8, 2024",
      time: "18:00",
      venue: "Grand Hotel, Waterfront",
      seats: "80 seats available",
      totalSeats: 100,
      takenSeats: 20,
      category: "Entertainment",
      price: "$85",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop"
    }
  ];

  // Normalize backend event shape to UI shape
  const normalizeEvent = (raw) => {
    if (!raw) return null;
    const start = raw.startDate ? new Date(raw.startDate) : null;
    const title = raw.title || raw.name || 'Event';
    const total = typeof raw.capacity === 'number' ? raw.capacity : (raw.totalSeats ?? 0);
    const taken = Array.isArray(raw.attendees) ? raw.attendees.length : (raw.takenSeats ?? 0);
    const image = raw.imageUrl || raw.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop';
    const heroImage = image;
    const category = (raw.categories && raw.categories[0]) || raw.category || 'General';
    const price = typeof raw.price === 'number' ? raw.price : (raw.price || 'Free');
    return {
      id: raw._id || raw.id,
      title,
      description: raw.description || '',
      date: start ? start.toLocaleDateString() : (raw.date || '-'),
      time: start ? start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (raw.time || '-'),
      venue: raw.location || raw.venue || '-',
      seats: `${Math.max(total - taken, 0)} seats available`,
      totalSeats: total || 0,
      takenSeats: taken || 0,
      category,
      price,
      image,
      heroImage,
      // raw timestamps for UI logic
      rawStart: raw.startDate || null,
      rawEnd: raw.endDate || null
    };
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        // Try backend first
        const res = await fetch(`${API_BASE}/api/events/${id}`);
        if (res.ok) {
          const json = await res.json();
          const normalized = normalizeEvent(json.item || json);
          if (!cancelled) setEvent(normalized);
          // After event loads, fetch participants to compute taken tickets
          try {
            const pres = await fetch(`${API_BASE}/api/participants/event/${json._id || json.id || id}`);
            if (pres.ok) {
              const pdata = await pres.json();
              const total = Array.isArray(pdata.items)
                ? pdata.items.reduce((sum, p) => sum + (typeof p.tickets === 'number' ? p.tickets : 1), 0)
                : 0;
              if (!cancelled) setTakenTickets(total);
            } else if (!cancelled) {
              setTakenTickets(0);
            }
          } catch {
            if (!cancelled) setTakenTickets(0);
          }
        } else {
          // fallback to demo data for old ids (1..n)
          const numericId = Number(id);
          const demo = demoEvents.find(e => e.id === numericId);
          if (!cancelled) {
            setEvent(demo || null);
            setTakenTickets(demo ? demo.takenSeats || 0 : 0);
          }
        }
      } catch (e) {
        const numericId = Number(id);
        const demo = demoEvents.find(e => e.id === numericId);
        if (!cancelled) {
          if (!demo) setError('Failed to load event');
          setEvent(demo || null);
          setTakenTickets(demo ? demo.takenSeats || 0 : 0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  // Ensure this hook runs before any conditional return to preserve hook order
  useEffect(() => {
    // If navigated from EventsPage with state to open registration and user is logged in
    let loggedIn = false;
    try { loggedIn = !!JSON.parse(localStorage.getItem('user')); } catch {}
    if (location?.state?.openRegistration && loggedIn) {
      setShowRegistrationForm(true);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="event-detail-page">
        <Navigation />
        <div className="not-found"><h1>Loading event...</h1></div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-detail-page">
        <Navigation />
        <div className="not-found">
          <h1>Event Not Found</h1>
          <button onClick={() => navigate('/events')} className="btn btn-primary">
            Back to Events
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return '#667eea';
      case 'business':
        return '#f093fb';
      case 'entertainment':
        return '#4facfe';
      default:
        return '#667eea';
    }
  };

  const totalCapacity = event.totalSeats || 0;
  const taken = typeof takenTickets === 'number' ? takenTickets : (event.takenSeats || 0);
  const remainingSeats = Math.max(totalCapacity - taken, 0);
  const seatPercentage = totalCapacity ? (taken / totalCapacity) * 100 : 0;

  const isPastEvent = (() => {
    const now = new Date();
    const start = event?.rawStart ? new Date(event.rawStart) : null;
    const end = event?.rawEnd ? new Date(event.rawEnd) : null;
    return (end && now > end) || (start && !end && now > start);
  })();


  return (
    <div className="event-detail-page">
      <Navigation />
      
      {/* Hero Section */}
      <section className="event-hero">
        <div className="event-hero-bg">
          <img src={event.heroImage} alt={event.title} />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="event-hero-content">
          <div 
            className="event-category-tag"
            style={{ backgroundColor: getCategoryColor(event.category) }}
          >
            {event.category}
          </div>
          
          <h1 className="event-title">{event.title}</h1>
          
          <div className="event-info-bar">
            <div className="event-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{event.date}</span>
            </div>
            
            <div className="event-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>{event.time}</span>
            </div>
            
            <div className="event-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Events */}
      <section className="back-section">
        <div className="back-container">
          <button onClick={() => navigate('/events')} className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            <span>Back to Events</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="event-content">
        <div className="content-container">
          
          {/* About This Event */}
          <div className="content-section">
            <h2 className="section-title">About This Event</h2>
            <p className="section-description">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="content-section">
            <h2 className="section-title">Event Details</h2>
            <div className="event-details-grid">
              <div className="detail-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div>
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{event.date}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span className="detail-label">Venue:</span>
                  <span className="detail-value">{event.venue}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <div>
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{event.time}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                <div>
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{event.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Register for Event */}
          <div className="content-section">
            <h2 className="section-title">Register for Event</h2>
            
            <div className="availability-section">
              <div className="availability-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Availability</span>
              </div>
              
              <div className="availability-bar">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${seatPercentage}%` }}
                  ></div>
                </div>
                <div className="availability-info">
                  <span className="taken-seats">{event.takenSeats} of {event.totalSeats} seats taken</span>
                  <span className="remaining-seats">{remainingSeats} seats left</span>
                </div>
              </div>
              
              <button 
                className="register-btn"
                onClick={() => {
                  let loggedIn = false;
                  try { loggedIn = !!JSON.parse(localStorage.getItem('user')); } catch {}
                  if (!loggedIn) {
                    navigate('/login');
                  } else {
                    setShowRegistrationForm(true);
                  }
                }}
                disabled={isPastEvent || (totalCapacity > 0 ? remainingSeats === 0 : false)}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm 
          event={event}
          onClose={() => {
            setShowRegistrationForm(false);
            setRegistrationSuccess(false);
          }}
          onRegister={async (registrationData) => {
            try {
              const user = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();
              const token = localStorage.getItem('token');
              if (!user) {
                navigate('/login');
                return;
              }
              const userId = user._id || user.id;
              const res = await fetch(`${API_BASE}/api/participants/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                  eventId: event.id,
                  userId,
                  name: registrationData.name,
                  email: registrationData.email,
                  phone: registrationData.phone,
                  numberOfTickets: registrationData.numberOfTickets
                })
              });
              const json = await res.json().catch(() => ({}));
              if (!res.ok) {
                throw new Error(json.message || 'Failed to register');
              }
              setRegistrationSuccess(true);
              // Optionally reload the event to update seats
              try {
                const refreshed = await fetch(`${API_BASE}/api/events/${event.id}`);
                if (refreshed.ok) {
                  const data = await refreshed.json();
                  const normalized = normalizeEvent(data.item || data);
                  setEvent(normalized);
                }
              } catch {}
              // Refresh participants tally to update availability
              try {
                const pres = await fetch(`${API_BASE}/api/participants/event/${event.id}`);
                if (pres.ok) {
                  const pdata = await pres.json();
                  const total = Array.isArray(pdata.items)
                    ? pdata.items.reduce((sum, p) => sum + (typeof p.tickets === 'number' ? p.tickets : 1), 0)
                    : 0;
                  setTakenTickets(total);
                }
              } catch {}
              setTimeout(() => {
                setShowRegistrationForm(false);
                setRegistrationSuccess(false);
              }, 1500);
            } catch (e) {
              alert(e.message);
            }
          }}
        />
      )}
      
      {/* Success Notification */}
      {registrationSuccess && (
        <div className="notification success">
          <p>Registration successful! You'll receive a confirmation email shortly.</p>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
