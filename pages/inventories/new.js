import InventoryForm from '../../components/forms/InventoryForm';
import { useAuth } from '../../utils/context/authContext';

const NewInventory = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Inventory</h2>
      <InventoryForm user={user} />
    </div>
  );
};

export default NewInventory;
