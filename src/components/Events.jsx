import React, { useState, useEffect } from 'react';
import './Events.css';

const Events = () => {
  
  const allEvents = [
    
    {
      id: 1,
      title: "Spring Fashion Week",
      type: "fashion",
      date: "2025-08-05",
      time: "7:00 PM",
      location: "Miami Beach Convention Center",
      description: "The premier showcase of spring collections from top designers.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      models: ["Alex Morgan", "Taylor Swift"],
      isPopular: true,
      followers: 1250,
      rsvps: 342
    },
    {
      id: 2,
      title: "Paris Fashion Gala",
      type: "fashion",
      date: "2025-07-20",
      time: "8:00 PM",
      location: "Louvre Museum, Paris",
      description: "Exclusive evening showcasing haute couture from leading Parisian designers.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      models: ["Gigi Hadid", "Kendall Jenner"],
      isPopular: true,
      followers: 1890,
      rsvps: 420
    },

    
    {
      id: 3,
      title: "New Faces Model Competition",
      type: "model",
      date: "2025-08-12",
      time: "3:00 PM",
      location: "Lincoln Road Mall",
      description: "Discover the next generation of modeling talent.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      agency: "Elite Models",
      isPopular: false,
      followers: 780,
      rsvps: 156
    },
    {
      id: 4,
      title: "International Model Casting",
      type: "model",
      date: "2025-08-10",
      time: "10:00 AM",
      location: "New York Fashion Hub",
      description: "Global casting call for models of all ethnicities and sizes.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      agency: "IMG Models",
      isPopular: true,
      followers: 1120,
      rsvps: 289
    },

    
    {
      id: 5,
      title: "Caribbean Cultural Festival",
      type: "festival",
      date: "2025-10-22",
      time: "12:00 PM",
      location: "Bayfront Park",
      description: "Celebrate Caribbean heritage through fashion, music and food.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      country: "Jamaica",
      isPopular: true,
      followers: 2100,
      rsvps: 587
    },
    {
      id: 6,
      title: "Tokyo Street Fashion Fest",
      type: "festival",
      date: "2025-07-30",
      time: "11:00 AM",
      location: "Harajuku District, Tokyo",
      description: "Experience the vibrant street fashion culture of Tokyo.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      country: "Japan",
      isPopular: true,
      followers: 2450,
      rsvps: 720
    },

    
    {
      id: 7,
      title: "Met Gala Afterparty",
      type: "fashion",
      date: "2025-07-30",
      time: "11:00 PM",
      location: "The Standard, NYC",
      description: "Exclusive afterparty following the iconic Met Gala.",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      models: ["Bella Hadid", "Timothée Chalamet"],
      isPopular: true,
      followers: 3200,
      rsvps: 890
    },
    {
      id: 8,
      title: "Milan Fashion Street",
      type: "festival",
      date: "2025-09-15",
      time: "2:00 PM",
      location: "Via Montenapoleone, Milan",
      description: "Open-air fashion extravaganza in the heart of Milan.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      country: "Italy",
      isPopular: true,
      followers: 2780,
      rsvps: 950
    }
  ];

  
  const [events, setEvents] = useState(allEvents);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [rsvpedEvents, setRsvpedEvents] = useState([]);
  const [followedEvents, setFollowedEvents] = useState([]);

  
  useEffect(() => {
    if (activeFilter === "all") {
      setEvents(allEvents);
    } else if (activeFilter === "popular") {
      setEvents(allEvents.filter(event => event.isPopular));
    } else {
      setEvents(allEvents.filter(event => event.type === activeFilter));
    }
  }, [activeFilter]);

  
  const handleRsvp = (eventId) => {
    if (rsvpedEvents.includes(eventId)) {
      setRsvpedEvents(rsvpedEvents.filter(id => id !== eventId));
      setEvents(events.map(event => 
        event.id === eventId ? {...event, rsvps: event.rsvps - 1} : event
      ));
    } else {
      setRsvpedEvents([...rsvpedEvents, eventId]);
      setEvents(events.map(event => 
        event.id === eventId ? {...event, rsvps: event.rsvps + 1} : event
      ));
    }
  };

  
  const handleFollow = (eventId) => {
    if (followedEvents.includes(eventId)) {
      setFollowedEvents(followedEvents.filter(id => id !== eventId));
      setEvents(events.map(event => 
        event.id === eventId ? {...event, followers: event.followers - 1} : event
      ));
    } else {
      setFollowedEvents([...followedEvents, eventId]);
      setEvents(events.map(event => 
        event.id === eventId ? {...event, followers: event.followers + 1} : event
      ));
    }
  };

  
  const toggleDetails = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  
  const renderEventDetails = (event) => {
    switch(event.type) {
      case "model":
        return (
          <div className="event-special-details">
            <p><strong>Agency:</strong> {event.agency}</p>
            {event.models && <p><strong>Featured Models:</strong> {event.models.join(", ")}</p>}
          </div>
        );
      case "festival":
        return (
          <div className="event-special-details">
            {event.country && <p><strong>Cultural Focus:</strong> {event.country}</p>}
          </div>
        );
      case "fashion":
        return (
          <div className="event-special-details">
            {event.models && <p><strong>Featured Designers/Models:</strong> {event.models.join(", ")}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      
      
      <div className="event-filters">
        <button 
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          All Events
        </button>
        <button 
          className={activeFilter === "popular" ? "active" : ""}
          onClick={() => setActiveFilter("popular")}
        >
          Popular Events
        </button>
        <button 
          className={activeFilter === "model" ? "active" : ""}
          onClick={() => setActiveFilter("model")}
        >
          Upcoming Models
        </button>
        <button 
          className={activeFilter === "festival" ? "active" : ""}
          onClick={() => setActiveFilter("festival")}
        >
          Cultural Festivals
        </button>
        <button 
          className={activeFilter === "fashion" ? "active" : ""}
          onClick={() => setActiveFilter("fashion")}
        >
          Fashion Events
        </button>
      </div>

      
      <div className="events-grid">
        {events.map(event => (
          <div 
            key={event.id} 
            className={`event-card ${event.type} ${expandedEvent === event.id ? "expanded" : ""}`}
          >
            <div className="event-image">
              <img 
                src={event.image} 
                alt={event.title} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
                }}
              />
              <span className="event-type">{event.type}</span>
            </div>
            
            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-meta">
                {event.date} • {event.time} • {event.location}
              </p>
              
              <p className="event-description">
                {event.description}
              </p>

              
              {expandedEvent === event.id && (
                <>
                  {renderEventDetails(event)}
                  <div className="event-stats">
                    <span>{event.followers} followers</span>
                    <span>{event.rsvps} attending</span>
                  </div>
                </>
              )}

              <div className="event-actions">
                <button 
                  className={`rsvp-button ${rsvpedEvents.includes(event.id) ? "active" : ""}`}
                  onClick={() => handleRsvp(event.id)}
                >
                  {rsvpedEvents.includes(event.id) ? "✓ Going" : "RSVP"}
                </button>
                <button 
                  className={`follow-button ${followedEvents.includes(event.id) ? "active" : ""}`}
                  onClick={() => handleFollow(event.id)}
                >
                  {followedEvents.includes(event.id) ? "✓ Following" : "Follow"}
                </button>
                <button 
                  className="details-button"
                  onClick={() => toggleDetails(event.id)}
                >
                  {expandedEvent === event.id ? "Less Details" : "More Details"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;