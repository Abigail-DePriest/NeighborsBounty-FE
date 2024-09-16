import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSignUps = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups`, {
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

const createSignUp = (signups) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signups),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSignUp = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups/${payload.id}`, {
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

const getSignUpById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSignUp = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSignUps,
  createSignUp,
  updateSignUp,
  getSignUpById,
  deleteSignUp,
};
