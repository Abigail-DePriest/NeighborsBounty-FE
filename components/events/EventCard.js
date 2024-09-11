import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../api/eventData';
// import { useAuth } from '../../utils/context/authContext';

export default function EventCard({ eventObj, onUpdate }) {
  const router = useRouter();
  // const { user } = useAuth();

  const deleteThisEvent = () => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
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
};
