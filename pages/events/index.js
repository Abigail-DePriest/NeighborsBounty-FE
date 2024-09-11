import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import EventCard from '../../components/events/EventCard';
import { getEvents } from '../../api/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then((data) => {
      setEvents(data);
    });
  };

  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <article className="events">
      <h1>All Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} onUpdate={() => getAllEvents()} />
        </section>
      ))}
    </article>
  );
}

export default Home;
