// components/events/SignUpCard.js
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const SignUpCard = ({ event, onLeaveEvent }) => (
  <Card className="text-center">
    <Card.Header>{event.eventTypeName}</Card.Header>
    <Card.Body>
      <Card.Title>Date: {event.eventDate}</Card.Title>
      <Card.Text>Time: {event.eventTime}</Card.Text>
      <Card.Text>Location: {event.location}</Card.Text>
      <Button variant="danger" onClick={() => onLeaveEvent(event.id)}>Leave Event</Button>
    </Card.Body>
    <Card.Footer className="text-muted">Organized by: {event.organizer.name}</Card.Footer>
  </Card>
);

SignUpCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventTypeName: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onLeaveEvent: PropTypes.func.isRequired,
};

export default SignUpCard;
