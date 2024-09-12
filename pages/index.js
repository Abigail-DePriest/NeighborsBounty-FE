import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const router = useRouter();
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginTop: '-100px' }}>
        <h3>Would You Like To....</h3>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/events/new')}>Add New Event</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/events')}>View Events</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/inventories')}>Check Inventory</Button>
        <Button className="d-block w-100 mb-2" onClick={() => navigateTo('/signups')}>Manage Your SignUps</Button>
        <Button className="d-block w-100" onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );
}

export default Home;
