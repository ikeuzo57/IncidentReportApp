/// <reference types="jest" />
const request = require('supertest');
const app = require('../src/app');
const storage = require('../src/storage');

describe('Incident API Endpoints', () => {

  beforeEach(() => {
    // Clear incidents before each test
    const incidents = storage.getIncidents();
    incidents.length = 0;
  });

  describe('POST /incident', () => {
    it('should create a new incident', async () => {
      const response = await request(app)
        .post('/incident')
        .send({
          type: 'error',
          description: 'Test incident'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.type).toBe('error');
      expect(response.body.description).toBe('Test incident');
      expect(response.body.status).toBe('open');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return 400 if type is missing', async () => {
      const response = await request(app)
        .post('/incident')
        .send({
          description: 'Test incident'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if description is missing', async () => {
      const response = await request(app)
        .post('/incident')
        .send({
          type: 'error'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /incidents', () => {
    it('should return all incidents', async () => {
      // Create a test incident first
      await request(app)
        .post('/incident')
        .send({
          type: 'error',
          description: 'Test incident'
        });

      const response = await request(app).get('/incidents');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0].type).toBe('error');
    });

    it('should return empty array when no incidents exist', async () => {
      const response = await request(app).get('/incidents');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /incident/:id', () => {
    it('should return incident by id', async () => {
      // Create a test incident first
      const createResponse = await request(app)
        .post('/incident')
        .send({
          type: 'error',
          description: 'Test incident'
        });

      const incidentId = createResponse.body.id;

      const response = await request(app).get(`/incident/${incidentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', incidentId);
      expect(response.body.type).toBe('error');
      expect(response.body.description).toBe('Test incident');
    });

    it('should return 404 if incident not found', async () => {
      const response = await request(app).get('/incident/nonexistent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});


