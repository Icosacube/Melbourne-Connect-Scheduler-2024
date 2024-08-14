import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

describe('Availability and Event Scheduling Integration', () => {
  let speakerId: string;
  let eventId: string;
  let tripId: string;

  beforeAll(async () => {
    // Create a speaker, event, and trip for testing
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

    const newTrip = {
      StartDate: '2024-12-01',
      EndDate: '2024-12-05',
      GuestSpeaker: [speakerId]
    };
    const tripResponse = await axios.post(`${API_BASE_URL}/trip/${speakerId}`, newTrip);
    tripId = tripResponse.data.id;
  });

  test('Availability collection and event scheduling', async () => {
    // Step 1: Generate availability canvassing links (simulated)
    const canvassingLink = `${API_BASE_URL}/availability-form`;

    // Step 2: Submit availability data
    const availabilityData = {
      StartTime: '2024-12-01T09:00:00Z',
      EndTime: '2024-12-01T17:00:00Z',
      Trip: [tripId]
    };
    const canvassingResponse = await axios.post(`${API_BASE_URL}/canvassing/${tripId}`, availabilityData);
    expect(canvassingResponse.status).toBe(200);
    expect(canvassingResponse.data.message).toBe('Canvassing created successfully');

    // Step 3: View combined availability calendar (simulated by fetching canvassing data)
    const canvassingDetails = await axios.get(`${API_BASE_URL}/canvassing/${tripId}`);
    expect(canvassingDetails.status).toBe(200);
    expect(canvassingDetails.data).toHaveLength(1);

    // Step 4: Schedule the event based on availabilities
    const updatedEvent = {
      Date: '2024-12-01'
    };
    const scheduleResponse = await axios.put(`${API_BASE_URL}/event/${eventId}`, updatedEvent);
    expect(scheduleResponse.status).toBe(200);
    expect(scheduleResponse.data.message).toBe('main Event updated successfully');
  });

  afterAll(async () => {
    await axios.delete(`${API_BASE_URL}/event/${eventId}`);
    await axios.delete(`${API_BASE_URL}/trip/${tripId}`);
    await axios.delete(`${API_BASE_URL}/speaker/${speakerId}`);
  });
});