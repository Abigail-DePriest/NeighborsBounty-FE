import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleEvent } from '../../api/eventData';
import SignUpCard from '../../components/signups/SignUpCard';

const SignUpManagement = () => {
  const router = useRouter();
  const { id } = router.query;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getSingleEvent(id)
        .then((data) => {
          if (data && typeof data === 'object') {
            setEventData(data);
          } else {
            console.error('Invalid event data:', data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventData) {
    return <div>No event found.</div>;
  }

  return (
    <div>
      <h1>Sign-Up Management</h1>
      <SignUpCard
        event={eventData}
      />
    </div>
  );
};

export default SignUpManagement;
