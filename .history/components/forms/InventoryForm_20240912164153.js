import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateInventory, createInventory } from '../../api/inventoryData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  foodType: '',
  quantity: '',
  pickupDate: '',
  pickupLocation: '',
};

function InventoryForm({ inventoryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (inventoryObj.id) {
      setFormInput({
        foodType: inventoryObj.foodType,
        quantity: inventoryObj.quantity,
        pickupDate: inventoryObj.pickupDate,
        pickupLocation: inventoryObj.pickupLocation,
      });
    }
  }, [inventoryObj]);

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
    if (inventoryObj.id) {
      console.warn('updateInventory', formInput);
      updateInventory({ ...formInput, userId: user.id }).then(() => router.push('/inventories'));
    } else {
      const payload = { ...formInput, userId: user.id };
      createInventory(payload).then(() => router.push('/inventories'));
      console.warn(payload);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Produce</Form.Label>
          <Form.Control name="foodType" required value={formInput.foodType} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control name="quantity" required value={formInput.quantity} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pick up Date</Form.Label>
          <Form.Control name="pickupDate" required value={formInput.pickupDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pick up Location</Form.Label>
          <Form.Control name="pickupLocation" required value={formInput.pickupLocation} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

InventoryForm.propTypes = {
  inventoryObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    foodType: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    pickupDate: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
  }),

};

InventoryForm.defaultProps = {
  inventoryObj: initialState,
};

export default InventoryForm;
