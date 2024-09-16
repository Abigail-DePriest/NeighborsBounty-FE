import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getEventDetails } from '../../api/eventData';

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getEventDetails(id)
        .then((eventData) => {
          setEvent(eventData);
        })
        .catch((error) => {
          console.error('Error fetching event details:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }
  const users = event.users || [];
  return (
    <div className="event-details">
      <h1>{event.eventTypeName}</h1>
      <p>Date: {event.eventDate}</p>
      <p>Time: {event.eventTime}</p>
      <p>Location: {event.location}</p>

      <h2>Joined Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        ) : (
          <p>No users have joined this event yet.</p>
        )}
      </ul>
    </div>
  );
};

export default EventDetails;
