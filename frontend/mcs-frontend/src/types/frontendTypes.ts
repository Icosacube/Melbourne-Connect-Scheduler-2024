import { Dayjs } from 'dayjs'
export enum PresetFilter {
    completed = '( {Completed} = FALSE() )',
}

export type Creation = {
    fields:
        | Speaker
        | Trip
        | MainEvent
        | SubEvent
        | Academic
        | Accommodation
        | Miscellaneous
        | Flight
        | Venue
        | Catering
        | Service
        | FundingAccount
        | Canvassing
}

export type TableFields = {
    id?: string
    fields:
        | Speaker
        | Trip
        | MainEvent
        | SubEvent
        | Academic
        | Accommodation
        | Miscellaneous
        | Flight
        | Venue
        | Catering
        | Service
        | FundingAccount
        | Canvassing
}

export type Speaker = {
    RecordID: string
    PrimaryEmail: string
    FirstName: string
    LastName: string
    Pronouns: string
    Title: string
    AlternativeTitle: string
    Phone: string
    Bio: string
    Headshot: string | any[] // string: url to publicly accessible photos (google drive etc); any[] for receive
    PreferredTimezone: string
    Category: string
    Area: string
    WorkTitle: string
    Organisation: string
    Department: string
    Address: string
    CitySuburb: string
    State?: string
    Country: string
    Postcode?: string
    EmergencyContactName: string
    EmergencyContactRelationship: string
    EmergencyContactNumber: string
    FlyerMembershipName: string
    FlyerMembershipNumber: string // Using string to account for string type ID
    Confirmed: boolean
    Trip: string[]
    MainEvent: string[]
    SubEvent: string[]
}

export type Trip = {
    RecordID: string
    StartDate: Dayjs // Example Format: "2024-04-30"
    EndDate: Dayjs // Example Format: "2024-04-30"
    Duration?: number
    GuestSpeaker: string[]
    MainEvent: string[]
    Accommodation: string[]
    Flight: string[]
    Miscellaneous: string[]
    AcademicCanvassing: string[]
    Completed: boolean
}

export type MainEvent = {
    RecordID: string
    EventName: string
    EventAbstract: string
    EventDescription: string
    EventbriteLink: string
    EventBanner: string | any[] // string: url to publicly accessible photos (google drive etc); any[] for receive
    Date: Dayjs // Example Format: "2024-04-30"
    Notes: string
    Speaker: string[]
    GuestAcademic: string[]
    Catering: string[]
    Venue: string[]
    Service: string[]
    Completed: boolean
    Trip: string[]
}

export type SubEvent = {
    EventName: string
    EventDescription: string
    EventType: string // or Enum
    Date: string // Example Format: "2024-04-30"
    Cost: number
    Notes: string
    Speaker: string[]
    FundingAccount: string[]
    Completed: boolean
}

export type Academic = {
    Email: string
    Name: string
    MainEvent: string
    Canvassing: string[]
}

export type Accommodation = {
    RecordID: string
    BookingReference: string
    HotelName: string
    Address: string
    Room: string
    CheckIn: Dayjs // Example Format: "2024-04-30"
    CheckOut: Dayjs // Example Format: "2024-04-30"
    NumberOfNight?: number
    Cost: number
    Notes: string
    FundingAccount: string[]
    Trip: string[]
}

export type Flight = {
    RecordID: string
    FlightReference: string
    Airline: string
    FlightNumber: string
    DepartureFrom: String
    ArrivedTo: String
    DepartDate: Dayjs
    ArriveDate: Dayjs
    Cost: number
    Trip: string[]
    FundingAccount: string[]
    ReturnFlight: string[]
}

export type Miscellaneous = {
    Cost: number
    Description: string
    Date: string
    TransportationType: string // or enum
    Notes: string
    Trip: string[]
    FundingAccount: string[]
}

export type Venue = {
    VenueName: string
    Location: string
    Cost: number
    InvoiceReference: string
    Notes: string
    FundingAccount: string[]
    MainEvent: string[]
}

export type Catering = {
    BookingReference: number
    Description: string
    Cost: number
    FundingAccount: string[]
    MainEvent: string[]
}

export type Service = {
    Cost: number
    ServiceDescription: string
    Notes: string
    FundingAccount: string[]
    MainEvent: string[]
}

export type FundingAccount = {
    ThemisString: string
    Description: string
    AccountUser: string
    AccountType: string
    Notes: string
    Limit: number
    ExpiryDate: string
    Accommodation: string[]
    Miscellaneous: string[]
    Venue: string[]
    Catering: string[]
    Flight: string[]
    Service: string[]
    SubEvent: string[]
}
  RecordID: string;
  ThemisString: string;
  Description: string;
  AccountUser: string;
  AccountType: string;
  Notes: string;
  Limit: number;
  ExpiryDate: string;
  Accommodation: string[];
  Miscellaneous: string[];
  Venue: string[];
  Catering: string[];
  Flight: string[];
  Service: string[];
}

export type Canvassing = {
    StartTime: string
    EndTime: string
    Trip: string[]
    Academic: string[]
}
