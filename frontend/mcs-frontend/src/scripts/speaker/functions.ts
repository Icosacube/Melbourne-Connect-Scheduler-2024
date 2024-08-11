import axios, { AxiosResponse } from 'axios';
import { Speaker } from '../../types/frontendTypes';

export async function getAllSpeakers(): Promise<Speaker[]> {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/speakers',
    );
    const rawSpeakers = res.data;
    const formattedSpeakers = rawSpeakers.map((speaker: any) =>
      reformatSpeakerResponseData(speaker),
    );
    return formattedSpeakers;
  } catch (error) {
    return [];
  }
}

export async function getSpeakerById(id: string): Promise<Speaker> {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/speaker/${id}`,
    );
    const rawSpeaker = res.data;

    const formattedSpeaker = reformatSpeakerResponseData(rawSpeaker);
    console.log(formattedSpeaker);
    return formattedSpeaker;
  } catch (error) {
    console.error('Error fetching speaker:', error);
    return {} as Speaker;
  }
}

export async function createSpeaker(speaker: Speaker): Promise<AxiosResponse> {
  const toSend: any = { ...speaker };
  delete toSend.RecordID;
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/speaker`,
    toSend,
  );
  // Server return message: Speaker created successfully if success
  return res;
}

export async function updateSpeaker(speaker: Speaker): Promise<AxiosResponse> {
  const toSend: any = { ...speaker };
  delete toSend.RecordID;
  const res = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/speaker/${speaker.RecordID}`,
    toSend,
  );
  // Server return message: Speaker created successfully if success
  return res;
}

export const defaultSpeaker: Speaker = {
  RecordID: '',
  PrimaryEmail: '',
  FirstName: '',
  LastName: '',
  Pronouns: '',
  Title: '',
  AlternativeTitle: '',
  Phone: '',
  Bio: '',
  Headshot: '',
  PreferredTimezone: '',
  Category: '',
  Area: '',
  WorkTitle: '',
  Organisation: '',
  Department: '',
  Address: '',
  CitySuburb: '',
  State: '',
  Country: '',
  Postcode: '',
  EmergencyContactName: '',
  EmergencyContactRelationship: '',
  EmergencyContactNumber: '',
  FlyerMembershipName: '',
  FlyerMembershipNumber: '',
  Confirmed: false,
  Trip: [],
  MainEvent: [],
  SubEvent: [],
};

function reformatSpeakerResponseData(data: any): Speaker {
  const speaker: Speaker = {
    ...defaultSpeaker,
    RecordID: data.fields.id || defaultSpeaker.RecordID,
    PrimaryEmail: data.fields.PrimaryEmail || defaultSpeaker.PrimaryEmail,
    FirstName: data.fields.FirstName || defaultSpeaker.FirstName,
    LastName: data.fields.LastName || defaultSpeaker.LastName,
    Pronouns: data.fields.Pronouns || defaultSpeaker.Pronouns,
    Title: data.fields.Title || defaultSpeaker.Title,
    AlternativeTitle: data.fields.AlternativeTitle || defaultSpeaker.AlternativeTitle,
    Phone: data.fields.Phone || defaultSpeaker.Phone,
    Bio: data.fields.Bio || defaultSpeaker.Bio,
    Headshot: data.fields.Headshot || defaultSpeaker.Headshot,
    PreferredTimezone:
      data.fields.PreferredTimezone || defaultSpeaker.PreferredTimezone,
    Category: data.fields.Category || defaultSpeaker.Category,
    Area: data.fields.Area || defaultSpeaker.Area,
    WorkTitle: data.fields.WorkTitle || defaultSpeaker.WorkTitle,
    Organisation: data.fields.Organisation || defaultSpeaker.Organisation,
    Department: data.fields.Department || defaultSpeaker.Department,
    Address: data.fields.Address || defaultSpeaker.Address,
    CitySuburb: data.fields.CitySuburb || defaultSpeaker.CitySuburb,
    State: data.fields.State || defaultSpeaker.State,
    Country: data.fields.Country || defaultSpeaker.Country,
    Postcode: data.fields.Postcode || defaultSpeaker.Postcode,
    EmergencyContactName:
      data.fields.EmergencyContactName || defaultSpeaker.EmergencyContactName,
    EmergencyContactRelationship:
      data.fields.EmergencyContactRelationship ||
      defaultSpeaker.EmergencyContactRelationship,
    EmergencyContactNumber:
      data.fields.EmergencyContactNumber || defaultSpeaker.EmergencyContactNumber,
    FlyerMembershipName:
      data.fields.FlyerMembershipName || defaultSpeaker.FlyerMembershipName,
    FlyerMembershipNumber:
      data.fields.FlyerMembershipNumber || defaultSpeaker.FlyerMembershipNumber,
    Confirmed: data.fields.Confirmed || defaultSpeaker.Confirmed,
    Trip: data.fields.Trip || defaultSpeaker.Trip,
    MainEvent: data.fields.MainEvent || defaultSpeaker.MainEvent,
    SubEvent: data.fields.SubEvent || defaultSpeaker.SubEvent,
  };

  return speaker;
}
