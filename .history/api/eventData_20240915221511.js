import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
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

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${payload.id}`, {
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

const getSingleEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${event}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getEventTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/eventtypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getEventTypeId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/eventtypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});
const eventSignUp = (payload) => new Promise((resolve, reject) => {
  console.log(endpoint);
  fetch(`${endpoint}/signups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const leaveEvent = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/signups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getEvents,
  createEvent,
  updateEvent,
  getSingleEvent,
  getEventTypes,
  getEventTypeId,
  deleteEvent,
  eventSignUp,
  leaveEvent,
};
