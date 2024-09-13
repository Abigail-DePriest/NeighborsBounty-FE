import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import InventoryCard from '../../components/inventory/InventoryCard';

import { getAllInventory } from '../../api/inventoryData';

function Home() {
  const [inventories, setInventory] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllInventories = () => {
    getAllInventory().then((data) => {
      setInventory(data);
    });
  };

  useEffect(() => {
    getAllInventories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <article className="inventories">
      <h1>All Inventory</h1>
      <Button
        onClick={() => {
          router.push('/inventories/new');
        }}
      >
        Add Inventory
      </Button>
      {inventories.map((inventory) => (
        <section key={`inventory--${inventory.id}`} className="inventory">
          <InventoryCard inventoryObj={inventory} onUpdate={() => getAllInventories()} />
        </section>
      ))}
    </article>
  );
}

export default Home;
