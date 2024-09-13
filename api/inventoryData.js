import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllInventory = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createInventory = (inventory) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inventory),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// eslint-disable-next-line consistent-return
const updateInventory = (payload) => new Promise((resolve, reject) => {
  if (!payload.id) {
    return reject(new Error('Inventory ID is required for update.'));
  }

  fetch(`${endpoint}/inventories/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getInventoryById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteInventory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllInventory,
  createInventory,
  updateInventory,
  getInventoryById,
  deleteInventory,
};
