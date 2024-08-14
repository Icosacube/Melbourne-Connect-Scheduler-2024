import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

describe('Speaker and Event Integration', () => {
  let speakerId: string;
  let eventId: string;

  const generateUniqueEmail = () => `test${Date.now()}@example.com`;

  test('End-to-end speaker invitation and event creation', async () => {
    // Step 1: Generate link for new speaker form (simulated)
    const speakerFormLink = `${API_BASE_URL}/speaker-form`;

    // Step 2: Submit speaker details through the form
    const newSpeaker = {
      PrimaryEmail: generateUniqueEmail(),
      FirstName: 'John',
      LastName: 'Doe',
      Bio: 'Test speaker bio',
      Headshot: 'https://example.com/headshot.jpg'
    };
    const speakerResponse = await axios.post(`${API_BASE_URL}/speaker`, newSpeaker);
    expect(speakerResponse.status).toBe(200);
    expect(speakerResponse.data.message).toBe('Speaker created successfully');
    speakerId = speakerResponse.data.id;

    // Step 3: Create a new event
    const newEvent = {
      EventName: 'Test Event',
      EventAbstract: 'Test abstract',
      Date: '2024-12-01',
      Speaker: [speakerId]
    };
    const eventResponse = await axios.post(`${API_BASE_URL}/event/${speakerId}`, newEvent);
    expect(eventResponse.status).toBe(200);
    expect(eventResponse.data.message).toBe('new Main Event created successfully');
    eventId = eventResponse.data.id;

    // Step 4: Verify the speaker is linked to the event
    const eventDetails = await axios.get(`${API_BASE_URL}/events/event/${eventId}`);
    expect(eventDetails.status).toBe(200);
    expect(eventDetails.data.Speaker).toContain(speakerId);
  });

  afterAll(async () => {
    await axios.delete(`${API_BASE_URL}/event/${eventId}`);
    await axios.delete(`${API_BASE_URL}/speaker/${speakerId}`);
  });
});