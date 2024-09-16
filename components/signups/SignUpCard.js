import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const SignUpCard = ({ event, onLeaveEvent }) => (
  <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
    <Card.Header style={{ textAlign: 'center', paddingTop: '10px' }}>
      {event.eventType.eventTypeName}
    </Card.Header>
    <Card.Body>
      <Card.Title style={{ textAlign: 'center' }}>
        Date: {event.eventDate}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'center' }}>
        Time: {event.eventTime}
      </Card.Subtitle>
      <Card.Text style={{ textAlign: 'center' }}>
        Location: {event.location}
      </Card.Text>
      <Button variant="danger" onClick={() => onLeaveEvent(event.id)} className="m-2">
        Leave Event
      </Button>
    </Card.Body>
  </Card>
);

SignUpCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventType: PropTypes.shape({
      id: PropTypes.number,
      eventTypeName: PropTypes.string,
    }),
    eventDate: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onLeaveEvent: PropTypes.func.isRequired,
};

export default SignUpCard;
