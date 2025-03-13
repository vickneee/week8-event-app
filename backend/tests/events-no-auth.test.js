const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Your Express app
const Event = require('../models/eventModel');

// Create a new instance of the supertest agent
const api = supertest(app);

const events = [
  {
    title: "Tech Conference 2025",
    date: "2025-06-15",
    location: "Helsinki, Finland",
    organizer: {
      name: "Tech Finland",
      contactEmail: "info@techfinland.com",
      contactPhone: "1234567890"
    }
  },
  {
    title: "AI & Machine Learning Workshop",
    date: "2025-08-22",
    location: "Tampere, Finland",
    organizer: {
      name: "AI Research Group",
      contactEmail: "aiworkshop@mlgroup.com",
      contactPhone: "1122334455"
    }
  }
];

describe('Event Controller', () => {
  beforeEach(async () => {
    await Event.deleteMany({});
    await Event.insertMany(events);
  });
  
  // Test GET /api/events
  it('should return all events as JSON when GET /api/events is called', async () => {
      const response = await api.get('/api/events').
        expect(200).
        expect('Content-Type', /application\/json/);
      
      expect(response.body).toHaveLength(events.length);
    });
  
  // Test POST /api/events
  it('should create a new event when POST /api/events is called', async () => {
    const newEvent =    {
        title: "Startup Meetup",
        date: "2025-07-10",
        location: "Espoo, Finland",
        organizer: {
          name: "Espoo Startups",
          contactEmail: "contact@espoostartups.com",
          contactPhone: "0987654321"
        }
      }
    
    await api.post('/api/events').
      send(newEvent).
      expect(201).
      expect('Content-Type', /application\/json/);
    
    const eventsAfterPost = await Event.find({});
    expect(eventsAfterPost).toHaveLength(events.length + 1);
    const eventNames = eventsAfterPost.map((event) => event.title);
    expect(eventNames).toContain(newEvent.title);
  });
  
  // Test GET /api/events/:id
  it(
    'should return one event by ID when GET /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      
      await api.get(`/api/events/${event._id}`).
        expect(200).
        expect('Content-Type', /application\/json/);
    },
  );
  
  it('should return 404 for a non-existing event ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    
    await api.get(`/api/events/${nonExistentId}`).expect(404);
  });
  
  // Test PUT /api/events/:id
  it(
    'should update one event with partial data when PUT /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      const updatedEvent = {
        title: 'Updated Event Info',
        location: 'Vantaa',
      };
      
      await api.put(`/api/events/${event._id}`).
        send(updatedEvent)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      const updatedEventCheck = await Event.findById(event._id);
      expect(updatedEventCheck.title).toBe(updatedEvent.title);
      expect(updatedEventCheck.location).toBe(updatedEvent.location);
    },
  );
  
  it(
    'should return 404 for invalid event ID when PUT /api/events/:id', async () => {
      const invalidId = '12345';
      
      await api.put(`/api/events/${invalidId}`).send({}).expect(404);
    });
  
  // Test DELETE /api/events/:id
  it(
    'should delete one event by ID when DELETE /api/events/:id is called',
    async () => {
      const event = await Event.findOne();
      
      await api.delete(`/api/events/${event._id}`).expect(204);
      
      const deletedEventCheck = await Event.findById(event._id);
      expect(deletedEventCheck).toBeNull();
    },
  );
  
  it(
    'should return 404 for invalid event ID when DELETE /api/events/:id',
    async () => {
      const invalidId = '12345';
      
      await api.delete(`/api/events/${invalidId}`).expect(404);
    },
  );
});

afterAll(() => {
  mongoose.connection.close();
});
