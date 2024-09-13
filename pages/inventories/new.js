import InventoryForm from '../../components/forms/InventoryForm';
import { useAuth } from '../../utils/context/authContext';

const NewInventory = () => {
  const { user } = useAuth();
  // Example inventory object, typically this would be fetched or initialized
  const inventoryObj = {
    id: '',
    weekStartDate: '',
    weekEndDate: '',
    pickupLocation: '',
    items: [], // Initially empty array, can be populated as needed
  };

  return (
    <div>
      <h2>Create New Inventory</h2>
      <InventoryForm inventoryObj={inventoryObj} user={user} />
    </div>
  );
};

export default NewInventory;
