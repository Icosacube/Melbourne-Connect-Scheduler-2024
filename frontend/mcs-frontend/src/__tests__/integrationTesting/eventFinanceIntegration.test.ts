import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

describe('Event and Finance Integration', () => {
  let speakerId: string;
  let eventId: string;
  let financialRecordId: string;

  beforeAll(async () => {
    // Create a speaker and event for testing
    const newSpeaker = {
      PrimaryEmail: `test${Date.now()}@example.com`,
      FirstName: 'John',
      LastName: 'Doe',
      Bio: 'Test speaker bio',
      Headshot: 'https://example.com/headshot.jpg'
    };
    const speakerResponse = await axios.post(`${API_BASE_URL}/speaker`, newSpeaker);
    speakerId = speakerResponse.data.id;

    const newEvent = {
      EventName: 'Test Event',
      EventAbstract: 'Test abstract',
      Date: '2024-12-01',
      Speaker: [speakerId]
    };
    const eventResponse = await axios.post(`${API_BASE_URL}/event/${speakerId}`, newEvent);
    eventId = eventResponse.data.id;
  });

  test('Event completion and financial record generation', async () => {
    // Step 1: Mark the event as completed
    const updatedEvent = {
      Completed: true
    };
    const updateResponse = await axios.put(`${API_BASE_URL}/event/${eventId}`, updatedEvent);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.message).toBe('main Event updated successfully');

    // Step 2: Enter financial details for the event
    const financialRecord = {
      Cost: 1000,
      Description: 'Event expenses',
      Date: '2024-12-01',
      MainEvent: [eventId]
    };
    const financeResponse = await axios.post(`${API_BASE_URL}/service/${eventId}`, financialRecord);
    expect(financeResponse.status).toBe(200);
    expect(financeResponse.data.message).toBe('Service created successfully');
    financialRecordId = financeResponse.data.id;

    // Step 3: Verify the financial record is created and linked to the event
    const financeDetails = await axios.get(`${API_BASE_URL}/services/service/${financialRecordId}`);
    expect(financeDetails.status).toBe(200);
    expect(financeDetails.data.MainEvent).toContain(eventId);
  });

  afterAll(async () => {
    await axios.delete(`${API_BASE_URL}/service/${financialRecordId}`);
    await axios.delete(`${API_BASE_URL}/event/${eventId}`);
    await axios.delete(`${API_BASE_URL}/speaker/${speakerId}`);
  });
});