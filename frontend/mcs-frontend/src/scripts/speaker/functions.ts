import axios, { AxiosResponse } from 'axios'
import { Speaker } from '../../types/frontendTypes'

export async function getAllSpeakers(): Promise<Speaker[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_API_PATH}`
        )
        const rawSpeakers = res.data
        const formattedSpeakers = rawSpeakers.map((speaker: any) =>
            reformatSpeakerResponseData(speaker)
        )
        return formattedSpeakers
    } catch (error) {
        return []
    }
}

export async function getSpeakerById(id: string): Promise<Speaker> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_API_PATH}/${id}`
        )
        const rawSpeaker = res.data

        const formattedSpeaker = reformatSpeakerResponseData(rawSpeaker)
        console.log(formattedSpeaker)
        return formattedSpeaker
    } catch (error) {
        console.error('Error fetching speaker:', error)
        return {} as Speaker
    }
}

export async function createSpeaker(speaker: Speaker): Promise<AxiosResponse> {
    const toSend: any = { ...speaker }
    delete toSend.RecordID
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_API_PATH}`,
        toSend
    )
    // Server return message: Speaker created successfully if success
    return res
}

export async function updateSpeaker(speaker: Speaker): Promise<AxiosResponse> {
    const toSend: any = { ...speaker }
    delete toSend.RecordID
    const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_API_PATH}/${speaker.RecordID}`,
        toSend
    )
    // Server return message: Speaker created successfully if success
    return res
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
    Confirmed: true,
    Trip: [],
    MainEvent: [],
    SubEvent: [],
}

function reformatSpeakerResponseData(data: any): Speaker {
    const speaker: Speaker = {
        ...defaultSpeaker,
        RecordID: data.id || defaultSpeaker.RecordID,
        PrimaryEmail: data.PrimaryEmail || defaultSpeaker.PrimaryEmail,
        FirstName: data.FirstName || defaultSpeaker.FirstName,
        LastName: data.LastName || defaultSpeaker.LastName,
        Pronouns: data.Pronouns || defaultSpeaker.Pronouns,
        Title: data.Title || defaultSpeaker.Title,
        AlternativeTitle:
            data.AlternativeTitle || defaultSpeaker.AlternativeTitle,
        Phone: data.Phone || defaultSpeaker.Phone,
        Bio: data.Bio || defaultSpeaker.Bio,
        Headshot: data.Headshot || defaultSpeaker.Headshot,
        PreferredTimezone:
            data.PreferredTimezone || defaultSpeaker.PreferredTimezone,
        Category: data.Category || defaultSpeaker.Category,
        Area: data.Area || defaultSpeaker.Area,
        WorkTitle: data.WorkTitle || defaultSpeaker.WorkTitle,
        Organisation: data.Organisation || defaultSpeaker.Organisation,
        Department: data.Department || defaultSpeaker.Department,
        Address: data.Address || defaultSpeaker.Address,
        CitySuburb: data.CitySuburb || defaultSpeaker.CitySuburb,
        State: data.State || defaultSpeaker.State,
        Country: data.Country || defaultSpeaker.Country,
        Postcode: data.Postcode || defaultSpeaker.Postcode,
        EmergencyContactName:
            data.EmergencyContactName || defaultSpeaker.EmergencyContactName,
        EmergencyContactRelationship:
            data.EmergencyContactRelationship ||
            defaultSpeaker.EmergencyContactRelationship,
        EmergencyContactNumber:
            data.EmergencyContactNumber ||
            defaultSpeaker.EmergencyContactNumber,
        FlyerMembershipName:
            data.FlyerMembershipName || defaultSpeaker.FlyerMembershipName,
        FlyerMembershipNumber:
            data.FlyerMembershipNumber || defaultSpeaker.FlyerMembershipNumber,
        Confirmed: data.Confirmed || defaultSpeaker.Confirmed,
        Trip: data.Trip || defaultSpeaker.Trip,
        MainEvent: data.MainEvent || defaultSpeaker.MainEvent,
        SubEvent: data.SubEvent || defaultSpeaker.SubEvent,
    }
    return speaker
}
