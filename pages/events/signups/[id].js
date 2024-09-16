// pages/events/signup.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleEvent } from '../../../api/eventData'; // Adjust based on your API setup
import SignUpForm from '../../../components/forms/SignUpForm'; // Import the form component

const SignUpPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState(null);
  useEffect(() => {
    if (id) {
      // Fetch event data
      getSingleEvent(id)
        .then((eventData) => {
          // Check if eventData is an object and has required properties
          if (eventData && typeof eventData === 'object') {
            setEvent(eventData);
          } else {
            console.error('Invalid event data:', eventData);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch event data:', error);
        });
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sign Up for {event.eventType?.eventTypeName || 'Unknown Event'}</h1>
      <SignUpForm
        id={id}
        onSuccess={() => router.push('/signup-management')} // Redirect on success
        onError={() => console.error('Sign-up failed. Please try again.')} // Handle error
      />
    </div>
  );
};

export default SignUpPage;
