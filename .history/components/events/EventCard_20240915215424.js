import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, eventSignUp } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ eventObj, onUpdate, joined }) {
  const router = useRouter();
  const { user } = useAuth();
  // const [signup, setSignup] = useState({
  //   id: '', event: '', role: '',
  // });

  const deleteThisEvent = () => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };
  const joinEvent = () => {
    console.warn('user id:', user.id, 'event object id:', eventObj.id);
    // Prepare the payload with eventId and userId
    const payload = {
      user: user.id, // Make sure to use the correct user ID field
      event: eventObj.id,
    };

    eventSignUp(payload)
      .then(() => {
        onUpdate();
        router.push(`/signup-management/${eventObj.id}`);
      })
      .catch((error) => {
        console.error('Failed to sign up for event:', error);
      });
  };

  return (
    <Card>
      <Card.Header as="h5">Event Type: {eventObj.eventType?.eventTypeName || 'Unknown'}</Card.Header>
      <Card.Body>
        <Card.Title>Location: {eventObj.location} </Card.Title>
        <Card.Text>
          When: {eventObj.eventDate} at {eventObj.eventTime}
        </Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/edit/${eventObj.id}`);
        }}
      >Edit
      </Button>
      {joined ? (
        <Button variant="secondary" disabled style={{ width: '100px' }}>
          Joined
        </Button>
      ) : (
        <Button variant="primary" onClick={joinEvent} style={{ width: '100px' }}>
          Join
        </Button>
      )}
      <Button
        onClick={deleteThisEvent}
      >Delete
      </Button>
    </Card>

  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired,
    eventType: PropTypes.shape({
      id: PropTypes.number,
      eventTypeName: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};
