import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './EventsPage.css';

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const handleViewDetails = (id) => {
    let loggedIn = false;
    try { loggedIn = !!JSON.parse(localStorage.getItem('user')); } catch {}
    if (loggedIn) {
      navigate(`/events/${id}`, { state: { openRegistration: true } });
    } else {
      navigate(`/events/${id}`);
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const json = await res.json();
        const items = Array.isArray(json.items) ? json.items : [];
        setEvents(items);
      } catch (e) {
        // ignore for now; could show a toast
      }
    }
    load();
  }, []);

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

  const computeStatus = (evt) => {
    const now = new Date();
    const start = evt.startDate ? new Date(evt.startDate) : null;
    const end = evt.endDate ? new Date(evt.endDate) : null;
    if (start && end && now >= start && now <= end) return 'Live';
    if (start && start > now) return 'Upcoming';
    return 'Past';
  };

  // Filter events based on search term, category, and date
  const normalized = useMemo(() => {
    return events.map((e) => ({
      _id: e._id,
      title: e.title || '',
      description: e.description || '',
      image: e.imageUrl || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
      category: (e.categories && e.categories[0]) || 'General',
      price: e.price && e.price > 0 ? `$${e.price}` : 'Free',
      date: e.startDate ? new Date(e.startDate).toLocaleDateString() : '-',
      time: e.startDate ? new Date(e.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
      venue: e.location || '-',
      status: computeStatus(e)
    }));
  }, [events]);

  const filteredEvents = normalized.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    const matchesDate = selectedDate === 'All Dates' || (event.date && event.date.includes(selectedDate));
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedDate('All Dates');
    setShowCalendar(false);
  };

  // Calendar functions
  const getCurrentMonth = () => {
    const now = new Date();
    return now.getMonth();
  };

  const getCurrentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventDates = () => {
    return events.map(event => {
      // Prefer backend ISO date fields
      const iso = event.startDate || event.date;
      if (!iso) return null;
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return null;
      return { month: d.getMonth(), day: d.getDate(), year: d.getFullYear() };
    }).filter(Boolean);
  };

  const eventDates = getEventDates();

  const isEventDate = (day, month, year) => {
    return eventDates.some(eventDate => 
      eventDate.day === day && eventDate.month === month && eventDate.year === year
    );
  };

  const handleDateClick = (day) => {
    const dateStr = `${monthNames[currentMonth]} ${day}, ${currentYear}`;
    setSelectedDate(dateStr);
    setShowCalendar(false);
  };

  const handleAllDatesClick = () => {
    setSelectedDate('All Dates');
    setShowCalendar(false);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="events-page">
      <Navigation />
      
      {/* Hero Section */}
      <section className="events-hero">
        <div className="events-hero-content">
          <h1 className="events-hero-title">Discover Amazing Events</h1>
          <p className="events-hero-subtitle">
            Find events that inspire, educate, and entertain. Your next great experience is just a click away.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-dropdown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Entertainment</option>
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </div>
          
          <div className="date-dropdown">
            <div className="date-selector" onClick={() => setShowCalendar(!showCalendar)}>
              <span>{selectedDate}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            
            {showCalendar && (
              <div className="calendar-popup">
                <div className="calendar-header">
                  <button onClick={prevMonth} className="calendar-nav-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"/>
                    </svg>
                  </button>
                  <h3>{monthNames[currentMonth]} {currentYear}</h3>
                  <button onClick={nextMonth} className="calendar-nav-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </button>
                </div>
                
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                  
                  <div className="calendar-days">
                    {Array.from({ length: firstDayOfMonth(currentMonth, currentYear) }, (_, i) => (
                      <div key={`empty-${i}`} className="calendar-day empty"></div>
                    ))}
                    
                    {Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => {
                      const day = i + 1;
                      const hasEvent = isEventDate(day, currentMonth, currentYear);
                      const isSelected = selectedDate.includes(`${day}`) && 
                                       selectedDate.includes(monthNames[currentMonth]) && 
                                       selectedDate.includes(`${currentYear}`);
                      
                      return (
                        <div
                          key={day}
                          className={`calendar-day ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleDateClick(day)}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="calendar-footer">
                  <button onClick={handleAllDatesClick} className="all-dates-btn">
                    All Dates
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
        </div>
      </section>

      {/* Events Listing */}
      <section className="events-listing">
        <div className="events-listing-container">
          <div className="events-count">
            Showing {filteredEvents.length} events
          </div>
          
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event._id || event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop'; }} />
                  <div 
                    className="event-category"
                    style={{ backgroundColor: getCategoryColor(event.category) }}
                  >
                    {event.category}
                  </div>
                  <div className="event-category" style={{ right: 'auto', left: '12px', top: 'auto', bottom: '12px', backgroundColor: '#111827' }}>
                    {event.status}
                  </div>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{event.venue}</span>
                    </div>
                    <div className="event-seats">{event.seats}</div>
                  </div>
                  
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(event._id || event.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
