import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getInventoryById } from '../../../api/inventoryData';
import InventoryForm from '../../../components/forms/InventoryForm';

export default function EditInventory() {
  const [editInventory, setEditInventory] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getInventoryById(id).then(setEditInventory);
  }, [id]);

  return (
    <InventoryForm inventoryObj={editInventory} setEditInventory={setEditInventory} user={user} />
  );
}
