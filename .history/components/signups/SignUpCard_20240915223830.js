import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSingleEvent, leaveEvent } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const SignUpCard = ({ id, onUpdate, leaveEvent }) => {
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

  const eventLeave = () => {
    const payload = {
      user: user.uid,
    };
    leaveEvent(id, payload).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>Sign-Up Management</Card.Header>
      <Card.Body>
        <Card.Title> User: {signUp.user.name} </Card.Title>
        <Card.Text> Event Name: {signUp.event.eventTypeName}</Card.Text>
        <Card.Text> Event Date: {signUp.event.eventDate}</Card.Text>
        <Card.Text> Event Time: {signUp.event.eventTime}</Card.Text>
        <Button variant="danger" onClick={eventLeave} style={{ width: '100px' }}>
          Leave
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Organized by: {signUp.event.organizer.name}</Card.Footer>
    </Card>
  );
};

SignUpCard.propTypes = {
  id: PropTypes.string.isRequired, // Assuming ID is a string. Adjust if it's a number.
  onUpdate: PropTypes.func.isRequired,
  leaveEvent: PropTypes.func.isRequired,
};

export default SignUpCard;
