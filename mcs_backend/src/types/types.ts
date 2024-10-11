export enum PresetFilter {
  completed = '( {Completed} = FALSE() )',
  confirmed = '( {Confirmed} = TRUE() )',
  notConfirmed = '( {Confirmed} = FALSE() )',
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
    | Checklist
    | EventTask;
};

export type TableFields = {
  id?: string;
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
    | Checklist
    | EventTask;
};

export type Speaker = {
  PrimaryEmail: string;
  FirstName: string;
  LastName: string;
  Pronouns: string;
  Title: string;
  AlternativeTitle: string;
  Phone: string;
  Bio: string;
  Headshot: string | any[]; // string: url to publicly accessible photos (google drive etc); any[] for receive
  PreferredTimezone: string;
  Category: string;
  Area: string;
  WorkTitle: string;
  Organisation: string;
  Department: string;
  Address: string;
  CitySuburb: string;
  State?: string;
  Country: string;
  Postcode?: string;
  EmergencyContactName: string;
  EmergencyContactRelationship: string;
  EmergencyContactNumber: string;
  FlyerMembershipName: string;
  FlyerMembershipNumber: string; // Using string to account for string type ID
  Confirmed: boolean;
  Trip: string[];
  MainEvent: string[];
};

export type Trip = {
  StartDate: string; // Example Format: "2024-04-30"
  EndDate: string; // Example Format: "2024-04-30"
  Duration?: number;
  GuestSpeaker: string[];
  MainEvent: string[];
  Accommodation: string[];
  Flight: string[];
  Miscellaneous: string[];
  Completed: boolean;
};

export type MainEvent = {
  EventName: string;
  EventAbstract: string;
  EventDescription: string;
  EventbriteLink: string;
  EventBanner: string | any[]; // string: url to publicly accessible photos (google drive etc); any[] for receive
  StartDate: string; // Example Format: "2024-04-30"
  EndDate: string; // Example Format: "2024-04-30"
  Notes: string;
  Speaker: string[];
  GuestAcademic: string[];
  Catering: string[];
  Venue: string[];
  Service: string[];
  Completed: boolean;
  Trip: string[];
  SubEvent: string[];
};

export type SubEvent = {
  EventName: string;
  EventDescription: string;
  EventType: string; // or Enum
  StartDate: string; // Example Format: "2024-04-30"
  Notes: string;
  Completed: boolean;
  MainEvent: string[];
  Speakers: string[];
  EndDate: string;
};

export type Academic = {
  Email: string;
  Name: string;
  MainEvent: string[];
  Canvassing: string[];
  CanvassingAvailable: string[];
};

export type Accommodation = {
  BookingReference: string;
  HotelName: string;
  Address: string;
  Room: string;
  CheckIn: string; // Example Format: "2024-04-30"
  CheckOut: string; // Example Format: "2024-04-30"
  NumberOfNight?: number;
  Cost: number;
  ExpenseDate: string; // Example Format: "2024-04-30"
  Notes: string;
  FundingAccount: string[];
  Trip: string[];
};

export type Flight = {
  FlightReference: string;
  Airline: string;
  FlightNumber: string;
  DepartureFrom: String;
  ArrivedTo: String;
  DepartDate: string;
  ArriveDate: string;
  Cost: number;
  ExpenseDate: string; // Example Format: "2024-04-30"
  Trip: string[];
  FundingAccount: string[];
  ReturnFlight: string[];
};

export type Miscellaneous = {
  Cost: number;
  Description: string;
  Date: string; // Example Format: "2024-04-30"
  ExpenseDate: string; // Example Format: "2024-04-30"
  Type: string; // or enum
  Notes: string;
  Trip: string[];
  FundingAccount: string[];
};

export type Venue = {
  VenueName: string;
  Location: string;
  Cost: number;
  ExpenseDate: string; // Example Format: "2024-04-30"
  InvoiceReference: string;
  Notes: string;
  FundingAccount: string[];
  MainEvent: string[];
  Canvassing: string[];
};

export type Catering = {
  BookingReference: number;
  Description: string;
  Cost: number;
  ExpenseDate: string; // Example Format: "2024-04-30"
  FundingAccount: string[];
  MainEvent: string[];
};

export type Service = {
  Cost: number;
  ServiceDescription: string;
  ExpenseDate: string; // Example Format: "2024-04-30"
  Notes: string;
  FundingAccount: string[];
  MainEvent: string[];
};

export type FundingAccount = {
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
};

export type Canvassing = {
  StartTime: string;
  EndTime: string;
  Academic: string[];
  MainEvent: string[];
  AvailableAcademic: String[];
  Venue: String[];
};

export type ExecutiveAssistant = {
  username: string;
  password: string;
  lastLoginTime: string;
  refreshToken: string;
};

export enum SpeakerForm {
  id = 'speakerID',
  PrimaryEmail = 'Email',
  FirstName = 'First Name',
  LastName = 'Last Name',
  Pronouns = 'Pronouns',
  Title = 'Title',
  AlternativeTitle = 'Alternative Title',
  Phone = 'Phone',
  Bio = 'Bio',
  PreferredTimezone = 'Preferred Timezone',
  Category = 'Category',
  Area = 'Area',
  WorkTitle = 'Work Title',
  Organisation = 'Organisation',
  Department = 'Department',
  Address = 'Address',
  CitySuburb = 'City / Suburb',
  State = 'State',
  Country = 'Country',
  Postcode = 'Postcode',
  EmergencyContactName = 'Emergency Contact Name',
  EmergencyContactRelationship = 'Emergency Contact Relationship',
  EmergencyContactNumber = 'Emergency Contact Number',
  FlyerMembershipName = 'Flyer Membership Name',
  FlyerMembershipNumber = 'Flyer Membership Number',
}

export enum MainEventForm {
  id = 'mainID',
  EventName = 'Event Name',
  EventAbstract = 'Event Abstract',
}
export type Checklist = {
  MainEvent: string[]
  EventTask: string[]
  Completed: string
}
export type EventTask= {
  Description: string
  Checklist: string[]
} 