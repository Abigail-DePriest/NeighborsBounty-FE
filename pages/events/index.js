import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import EventCard from '../../components/events/EventCard';
import { getEvents } from '../../api/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          {/* Ensure eventObj.game is an object */}
          <EventCard eventObj={event} onUpdate={() => getAllEvents()} />
        </section>
      ))}
    </article>
  );
}

export default Home;
