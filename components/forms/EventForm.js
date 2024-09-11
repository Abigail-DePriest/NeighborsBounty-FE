import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateEvent, createEvent, getEventTypes } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  eventType: 1,
  location: '',
  eventDate: '',
  eventTime: '',
};

function EventForm({ eventObj }) {
  const [eventtypes, setEventTypes] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEventTypes().then(setEventTypes);
    if (eventObj.id) {
      setFormInput(eventObj);
      const typeId = eventObj.eventType.id;
      setFormInput((preVal) => ({ ...preVal, eventType: typeId }));
    }
  }, [eventObj, user]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventObj.id) {
      console.warn('updateEvent', formInput);
      updateEvent({ ...formInput, eventType_id: 1 }).then(() => router.push('/events'));
    } else {
      const payload = { ...formInput, userId: user.id };
      createEvent(payload).then(() => router.push('/events'));
      console.warn(payload);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" required value={formInput.location} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="eventDate" required value={formInput.eventDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="eventTime" required value={formInput.eventTime} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Type</Form.Label>
          <Form.Select name="eventType" value={formInput.eventType.id} onChange={handleChange}>
            <option value=""> Select an Event Type</option>
            {
              eventtypes.map((eventtype) => (
                <option
                  key={eventtype.id}
                  value={eventtype.id}
                >
                  {eventtype.eventTypeName}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.string,
    eventDate: PropTypes.string,
    eventTime: PropTypes.string,
    eventType: PropTypes.shape({
      id: PropTypes.number,
      eventTypeName: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
