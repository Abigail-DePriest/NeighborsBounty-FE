import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleEvent, leaveEvent } from '../../api/eventData';

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
  const eventLeave = () => {
    const payload = {
      userId: user.uid,
    };
    leaveEvent(id, payload).then(() => {
      onUpdate();
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>Sign-Up Management</Card.Header>
      <Card.Body>
        <Card.Title> User: {signUp.name} </Card.Title>
        <Card.Text> Event Name: {signUp.eventType.eventTypeName}</Card.Text>
        <Card.Text> Event Name: {signUp.eventDate}</Card.Text>
        <Card.Text> Event Name: {signUp.eventTime}</Card.Text>
       
        {joined
          ? <Button variant="danger" onClick={eventLeave} style={{ width: '100px' }}>Leave</Button>
          : <Button variant="primary" onClick={eventSignup} style={{ width: '100px' }}>Join</Button> }
      </Card.Body>
      <Card.Footer className="text-muted">Organized by: {organizer.id}</Card.Footer>
    </Card>
  );
};


export default SignUpManagement;
