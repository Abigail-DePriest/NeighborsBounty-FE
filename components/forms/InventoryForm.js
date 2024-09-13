import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateInventory, createInventory } from '../../api/inventoryData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  weekStartDate: '',
  weekEndDate: '',
  pickupLocation: '',
  items: [], // array of items!!
};

function InventoryForm({ inventoryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (inventoryObj.id) {
      setFormInput({
        weekStartDate: inventoryObj.weekStartDate || '',
        weekEndDate: inventoryObj.weekEndDate || '',
        pickupLocation: inventoryObj.pickupLocation || '',
        items: inventoryObj.items?.map((item) => ({
          ...item,
          id: item.id || Date.now() + Math.random(), // Generate unique ID if not present
        })) || [],
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
  const handleItemChange = (id, e) => {
    const { name, value } = e.target;
    const newItems = formInput.items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      } return item;
    });
    setFormInput({ ...formInput, items: newItems });
  };
  const handleAddItem = () => {
    setFormInput({
      ...formInput,
      items: [
        ...formInput.items, {
          id: Date.now() + Math.random(), foodType: '', quantity: '0', pickupDate: '',
        }, // Added unique ID
      ],
    });
  };

  const handleRemoveItem = (id) => {
    const newItems = formInput.items.filter((item) => item.id !== id);
    setFormInput({ ...formInput, items: newItems });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inventoryObj.id) {
      console.warn('updateInventory', formInput);
      updateInventory({ ...formInput, id: inventoryObj.id, userId: user.id }).then(() => router.push('/inventories'));
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
          <Form.Label>Week Start Date</Form.Label>
          <Form.Control type="date" name="weekStartDate" required value={formInput.weekStartDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>weekEndDate</Form.Label>
          <Form.Control type="date" name="weekEndDate" required value={formInput.weekEndDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pick up Location</Form.Label>
          <Form.Control type="text" name="pickupLocation" required value={formInput.pickupLocation} onChange={handleChange} />
        </Form.Group>

        {formInput.items.map((item) => (
          <div key={item.id} className="mb-3">
            <Form.Group>
              <Form.Label>Food Type</Form.Label>
              <Form.Control
                type="text"
                name="foodType"
                value={item.foodType}
                onChange={(e) => handleItemChange(item.id, e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(item.id, e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control
                type="date"
                name="pickupDate"
                value={item.pickupDate}
                onChange={(e) => handleItemChange(item.id, e)}
              />
            </Form.Group>

            <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
              Remove Item
            </Button>
          </div>
        ))}

        <Button variant="primary" onClick={handleAddItem}>
          Add Item
        </Button>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

InventoryForm.propTypes = {
  inventoryObj: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    weekStartDate: PropTypes.string.isRequired,
    weekEndDate: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        foodType: PropTypes.string,
        quantity: PropTypes.string,
        pickupDate: PropTypes.string,
      }),
    ).isRequired,
  }),

};

InventoryForm.defaultProps = {
  inventoryObj: {
    id: '',
    weekStartDate: '',
    weekEndDate: '',
    pickupLocation: '',
    items: [],
  },
};

export default InventoryForm;
