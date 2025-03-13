const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userModel');
const Event = require('../models/eventModel');

const events = [
  {
    title: 'Tech Conference 2025',
    date: '2025-06-15',
    location: 'Helsinki, Finland',
    organizer: {
      name: 'Tech Finland',
      contactEmail: 'info@techfinland.com',
      contactPhone: '1234567890',
    },
  },
  {
    title: 'Startup Meetup',
    date: '2025-07-10',
    location: 'Espoo, Finland',
    organizer: {
      name: 'Espoo Startups',
      contactEmail: 'contact@espoostartups.com',
      contactPhone: '0987654321',
    },
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post('/api/users/signup').send({
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    password: "Hash789!",
    gender: "Other",
    date_of_birth: "1995-12-10",
    address: {
      street: "789 Birch St",
      city: "Tampere",
      state: "Pirkanmaa",
      zip: "33100",
      country: "Finland"
    },
    occupation: "Graphic Designer",
    phone: "1122334455"
  });
  token = result.body.token
});

describe('Given there are initially some events saved', () => {
  beforeEach(async () => {
    await Event.deleteMany({});
    await api.post('/api/events').
      set('Authorization', 'bearer ' + token).
      send(events[0]).
      send(events[1]);
  });
  
  it(
    'should return all events as JSON when GET /api/events is called',
    async () => {
      await api.get('/api/events').
        set('Authorization', 'bearer ' + token).
        expect(200).
        expect('Content-Type', /application\/json/);
    },
  );
  
  it('should create one event when POST /api/events is called', async () => {
    const newEvent = {
        title: 'Startup Meetup',
        date: '2025-07-10',
        location: 'Espoo, Finland',
        organizer: {
          name: 'Espoo Startups',
          contactEmail: 'contact@espoostartups.com',
          contactPhone: '0987654321',
        },
      };
    
    await api
    .post('/api/events')
    .set('Authorization', 'bearer ' + token)
    .send(newEvent)
    .expect(201);
  });
  
  it(
    'should return one event by ID when GET /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      await api.get('/api/events/' + event._id)
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    },
  );
  
  it(
    'should not return one event by incorrect ID when GET /api/events/:id is called',
    async () => {
      const incorrectId = "IncorrectID"; // Use invalid ID format
      await api
      .get(`/api/events/${incorrectId}`) // Use incorrectId variable.
      .set('Authorization', 'bearer ' + token)
      .expect(404)
      .expect('Content-Type', /application\/json/);
    },
  );
  
  it(
    'should update one event by ID when PUT /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      const updatedEvent = {
        title: 'Updated title',
      };
      await api.put('/api/events/' + event._id).
        set('Authorization', 'bearer ' + token).
        send(updatedEvent).
        expect(200);
      const updatedEventCheck = await Event.findById(event._id);
      expect(updatedEventCheck.toJSON()).toEqual(expect.objectContaining(updatedEvent));
    },
  );
  
  it(
    'should not update an event by incorrect ID when PUT /api/events/:id is called',
    async () => {
      const incorrectId = "IncorrectID"; // Use invalid ID format
      const updatedEvent = {
        title: 'Updated title',
      };
      await api.put(`/api/events/${incorrectId}`).
        set('Authorization', 'bearer ' + token)
        .send(updatedEvent)
        .expect(404);
    },
  );
  
  it(
    'should delete one event by ID when DELETE /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      await api.delete('/api/events/' + event._id).
        set('Authorization', 'bearer ' + token).
        expect(204);
      const eventCheck = await Event.findById(event._id);
      expect(eventCheck).toBeNull();
    },
  );
  
  it(
    'should not delete an event by incorrect ID when DELETE /api/events/:id is called',
    async () => {
      const incorrectId = "IncorrectID"; // Use invalid ID format
      await api.delete(`/api/events/${incorrectId}`).
        set('Authorization', 'bearer ' + token).
        expect(404);
    },
  );
  
});

afterAll(() => {
  mongoose.connection.close();
});
