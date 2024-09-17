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
    <Card style={{ margin: '15px' }}>
      <Card.Header as="h5"> {inventoryObj.weekStartDate}</Card.Header>
      <Card.Body>
        <Card.Title>{inventoryObj.weekEndDate} </Card.Title>
        <p>Pickup Location: {inventoryObj.pickupLocation}</p>
        <ul>
          {Array.isArray(inventoryObj.items) ? (
            inventoryObj.items.map((item) => (
              <li key={item.id}>
                {item.foodType} Quantity: {String(item.quantity)} units, Pickup Date: {item.pickupDate}
              </li>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </ul>
      </Card.Body>
      <Button
        style={{ width: '200px', margin: '5px' }}
        onClick={() => {
          router.push(`/inventories/edit/${inventoryObj.id}`);
        }}
      >Edit
      </Button>
      <Button
        style={{ width: '200px', margin: '5px' }}
        onClick={deleteThisInventory}
      >Delete
      </Button>
    </Card>
  );
}

InventoryCard.propTypes = {
  inventoryObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    weekStartDate: PropTypes.string.isRequired,
    weekEndDate: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        foodType: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        pickupDate: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
