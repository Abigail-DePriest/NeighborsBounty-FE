import { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSignUps } from '../../api/signupData';
import { getEventById, leaveEvent } from '../../api/eventData';
import SignUpCard from '../../components/signups/SignUpCard';

const MySignUps = () => {
  const { user } = useAuth();
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getSignUps(user.id)
        .then(async (signupsData) => {
          if (Array.isArray(signupsData)) {
            const detailedSignups = await Promise.all(signupsData.map(async (signup) => {
              const event = await getEventById(signup.event.id); // Fetch detailed event info
              return {
                ...signup,
                event,
              };
            }));
            setSignups(detailedSignups);
          } else {
            console.error('Invalid sign-up data:', signupsData);
            setError('Invalid sign-up data');
          }
        })
        .catch((err) => setError(err.message || 'Failed to fetch sign-ups'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleLeaveEvent = async (eventId) => {
    try {
      await leaveEvent(eventId);
      setSignups((prevSignups) => prevSignups.filter((signup) => signup.event.id !== eventId));
    } catch (err) {
      setError(err.message || 'Failed to leave the event');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (signups.length === 0) {
    return <div>You have not signed up for any events.</div>;
  }

  return (
    <div>
      <h1>My Sign-Ups</h1>
      {signups.map((signup) => (
        <SignUpCard
          key={`${signup.id}-${signup.event.id}`}
          event={signup.event}
          onLeaveEvent={() => handleLeaveEvent(signup.event.id)}
        />
      ))}
    </div>
  );
};

export default MySignUps;
