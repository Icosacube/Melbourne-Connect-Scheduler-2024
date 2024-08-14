import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

describe('Trip and Speaker Integration', () => {
  let speakerId: string;
  let tripId: string;

  beforeAll(async () => {
    // Create a speaker for testing
    const newSpeaker = {
      PrimaryEmail: `test${Date.now()}@example.com`,
      FirstName: 'John',
      LastName: 'Doe',
      Bio: 'Test speaker bio',
      Headshot: 'https://example.com/headshot.jpg'
    };
    const speakerResponse = await axios.post(`${API_BASE_URL}/speaker`, newSpeaker);
    speakerId = speakerResponse.data.id;
  });

  test('Trip creation with speaker assignment', async () => {
    // Step 1: Create a new trip
    const newTrip = {
      StartDate: '2024-12-01',
      EndDate: '2024-12-05',
      GuestSpeaker: [speakerId]
    };
    const tripResponse = await axios.post(`${API_BASE_URL}/trip/${speakerId}`, newTrip);
    expect(tripResponse.status).toBe(200);
    expect(tripResponse.data.message).toBe('Trip created successfully');
    tripId = tripResponse.data.id;

    // Step 2: Verify the speaker is linked to the trip
    const tripDetails = await axios.get(`${API_BASE_URL}/trips/trip/${tripId}`);
    expect(tripDetails.status).toBe(200);
    expect(tripDetails.data.GuestSpeaker).toContain(speakerId);
  });

  afterAll(async () => {
    await axios.delete(`${API_BASE_URL}/trip/${tripId}`);
    await axios.delete(`${API_BASE_URL}/speaker/${speakerId}`);
  });
});