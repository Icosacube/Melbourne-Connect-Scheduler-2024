import axios from 'axios';

export async function loader() {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/speakers');
    const rawSpeakers = res.data;
    const speakers = [];

    // Flatten it so ID is on same level as fields
    rawSpeakers.forEach((speaker) => {
      speaker.fields.id = speaker.id;
      var index = rawSpeakers.findIndex((spkr) => spkr === speaker);
      speakers[index] = speaker.fields;
    });
    console.log(speakers);
    return speakers;
  } catch (error) {
    return {};
  }
}
