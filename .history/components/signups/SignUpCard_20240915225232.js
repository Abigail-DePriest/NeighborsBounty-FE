import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleEvent, leaveEvent } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const SignUpCard = ({ id, onUpdate }) => {
  const router = useRouter();
  const { user } = useAuth();

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

  const handleLeave = () => {
    const payload = {
      user: user.uid,
    };
    leaveEvent(id, payload).then(() => {
      onUpdate();
      router.push('/signup-management'); // Refresh data or trigger other actions
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>Sign-Up Management</Card.Header>
      <Card.Body>
        <Card.Title>User: {signUp.user.name}</Card.Title>
        <Card.Text>Event Name: {signUp.event.eventTypeName}</Card.Text>
        <Card.Text>Event Date: {signUp.event.eventDate}</Card.Text>
        <Card.Text>Event Time: {signUp.event.eventTime}</Card.Text>
        <Button variant="danger" onClick={handleLeave} style={{ width: '100px' }}>
          Leave
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Organized by: {signUp.event.organizer.name}</Card.Footer>
    </Card>
  );
};

SignUpCard.propTypes = {
  id: PropTypes.string.isRequired, // Ensure ID type matches your data
  onUpdate: PropTypes.func.isRequired,
  leaveEvent: PropTypes.func.isRequired,
};

export default SignUpCard;
