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
    SubEvent: string[]
    EventTotal: number
}

export type SubEvent = {
    RecordID: string
    EventName: string
    EventDescription: string
    EventType: string // or Enum
    StartDate: Dayjs // Example Format: "2024-04-30"
    Notes: string
    MainEvent: string[]
    Completed: boolean
    Speakers: string[]
    EndDate: Dayjs
}

export type Academic = {
    RecordID: string
    Email: string
    Name: string
    MainEvent: string[]
    Canvassing: string[]
    CanvassingAvailable: string[]
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
    RecordID: string
    VenueName: string
    Location: string
    Cost: number
    InvoiceReference: string
    Notes: string
    FundingAccount: string[]
    MainEvent: string[]
}

export type Catering = {
    RecordID: string
    BookingReference: string
    Description: string
    Cost: number
    ExpenseDate: Dayjs
    FundingAccount: string[]
    MainEvent: string[]
    Finance: string[]
}

export type Service = {
    Cost: number
    ServiceDescription: string
    Notes: string
    FundingAccount: string[]
    MainEvent: string[]
}

export type FundingAccount = {
    RecordID: string
    ThemisString: string
    Description: string
    AccountUser: string
    AccountType: string
    Notes: string
    Limit: number
    ExpiryDate: Dayjs
    Accommodation: string[]
    Miscellaneous: string[]
    Venue: string[]
    Catering: string[]
    Flight: string[]
    Service: string[]
}

export type Canvassing = {
    RecordID: string
    StartTime: Dayjs
    EndTime: Dayjs
    Academic: string[]
    Venue: string[]
    MainEvent: string[]
    AvailableAcademic: string[]
    EventName: string[]
    AcademicName: string[]
}

export type Finance = {
    RecordID: string
    MainEventID: string
    MainEventName?: string
    MainEventDate?: Dayjs
    KeyNoteSpeakerName?: string
    EventTotalCost?: number
    ExpenseCategory: string
    ExpenseDescription: string
    Cost: number
    ExpenseDate: Dayjs
    FundingAccount: string
}

// temporary data type for frontend canvassing
export type TimeSlot = {
    StartTime: Dayjs
    EndTime: Dayjs
    MainEvent: string
    AvailableAcademic: string[]
    MixedAcademic: { name: string; email: string }[]
}

export type CanvassingTemp = {
    id: string
    StartTime: Dayjs
    EndTime: Dayjs
    MainEvent: string[]
    Venue: string[]
    AvailableAcademic: string[]
    MixedAcademic: { id: string; name: string; email: string }[]
}
