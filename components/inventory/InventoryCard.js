import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteInventory } from '../../api/inventoryData';
// import { useAuth } from '../../utils/context/authContext';

export default function InventoryCard({ inventoryObj, onUpdate }) {
  const router = useRouter();
  // const { user } = useAuth();

  const deleteThisInventory = () => {
    if (window.confirm('Delete this inventory?')) {
      deleteInventory(inventoryObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Header as="h5"> {inventoryObj.foodType}</Card.Header>
      <Card.Body>
        <Card.Title>{inventoryObj.quantity} </Card.Title>
        <Card.Text>
          {inventoryObj.pickupDate} {inventoryObj.pickupLocation}
        </Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/inventories/edit/${inventoryObj.id}`);
        }}
      >Edit
      </Button>
      <Button
        onClick={deleteThisInventory}
      >Delete
      </Button>
    </Card>
  );
}

InventoryCard.propTypes = {
  inventoryObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    foodType: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    pickupDate: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
