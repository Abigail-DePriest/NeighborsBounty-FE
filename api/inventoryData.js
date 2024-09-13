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

const createInventory = (inventories) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inventories),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateInventory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleInventory = (inventory) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/inventories/${inventory}`, {
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
  getSingleInventory,
  deleteInventory,
};
