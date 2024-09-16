import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleEvent } from '../../api/eventData';

const SignUpManagement = () => {
  const router = useRouter();
  const { id } = router.query;

  const [signUp, setSignUp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getSingleEvent(id)
        .then((signupData) => {
          if (signupData && typeof signupData === 'object') {
            setSignUp(signupData);
          } else {
            console.error('Invalid sign-up data:', signupData);
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

  if (!signUp) {
    return <div>No sign-up found.</div>;
  }

  return (
    <div>
      <h1>Sign-Up Management</h1>
      <p>User: {signUp.name}</p>
      <p>Event Name: {signUp.eventType.eventTypeName}</p>
      <p>Location: {signUp.location}</p>
      <p>Date: {signUp.eventDate}</p>
      <p>Time: {signUp.eventTime}</p>
      {/* Add more details or actions here */}
    </div>
  );
};

export default SignUpManagement;
