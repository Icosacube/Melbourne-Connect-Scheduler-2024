
export enum PresetFilter {
    completed = "( {Completed} = FALSE() )",
}

export type Creation = {
    fields: Speaker | Trip | Main_Event | Sub_Event | Academic | Accommodation |
    LocalTransport | Flight | Venue | Catering | Service | FundingAccount | 
    Canvassing;
}

export type TableFields = {
    id: string;
    fields: Speaker | Trip | Main_Event | Sub_Event | Academic | Accommodation |
    LocalTransport | Flight | Venue | Catering | Service | FundingAccount | 
    Canvassing;
}

export type Speaker = {
    SpeakerID?: number;
    Primary_Email: string;
    Title: string;
    Alternative_Title: string;
    First_Name: string;
    Last_Name: string;
    Gender: string;
    Time_zone: string;
    Phone: number; 
    Work_Title: string;
    Organisation: string;
    Department: string;
    Address: string;
    City_Suburb: string;	
    State?: string;
    Country: string;
    Postcode?: string;
    Emergency_Contact_Name: string;	
    Emergency_Contact_Relationship: string;
    Emergency_Contact_Number: Number;
    Flyer_Membership_Name: string;
    Flyer_Membership_Number: string;
    Bio: string;
    Headshot: string; // url to publicly accessible photos (google drive etc)
    Trip: string[]; 
    Event:	string[];
    Main_Event: string[];
    Confirmed: boolean;	
}

export type Trip = {
    TripID?: number;
    Guest_Speaker: string[];
    StartDate: string;
    EndDate: string;
    Duration?: number;
    Accommodation: string[];
    Local_Transport: string[];
    Flight: string[];
    Academic_Canvassing: string[];
    Completed: boolean;
}

export type Main_Event = {
    EventID?: number;
    Event_Name: string;
    Event_Abstract: string;
    Event_Description: string;
    Event_banner: any[];
    Date: string;
    Speaker: string[];
    Catering: string[];
    Venue: string[];
    Service: string[];
    completed: boolean;
    Notes: string;
}

export type Sub_Event = {
    EventID?: number;
    Event_Name: string;
    Event_Abstract: string;
    Event_Description: string;
    Event_banner: any[];
    Date: string;
    Speaker: string[];
    Catering: string[];
    Venue: string[];
    Service: string[];
    completed: boolean;
    Notes: string;
}

export type Academic = {
    AcademicID?: number;
    Email: string;
    Name: string;
    Sub_Event: string;
    Canvassing: string[];
}

export type Accommodation = {
    Accommodation_book_reference: string;
    Hotel_Name: string;
    Address: string;
    Room: string;
    Check_In: string;
    Check_Out: string;
    Number_of_Night?: number;
    Notes: string;
    Cost: number;
    Funding_Account: string[];
    Trip: string[];
}

export type LocalTransport = {
    TransportID?: number;
    Transportation_Type: string; // or enum 
    Date: string;
    Cost: number;
    Notes: string;
    Funding_Account: string[];
}

export type Flight = {
    Flight_Reference: string;
    Flight_Number: number;
    Depart_Date: string;
    Arrive_date: string;
    From: String;
    To: String;
    Airlines: string;
    Flight_Duration?: number;
    Return_Flight: string[];
    Cost: number;
    Funding_Account: string[];
    Trip: string[];
}

export type Venue = {
    VenueID?: number;
    Name: string;
    Location: string;
    Cost: number;
    Notes: string;
    Invoice_Reference: string;
    Funding_Account: string[];
}

export type Catering = {
    Booking_Reference: number;
    Cost: number;
    Description: string;
    Funding_Account: string[];
    Main_Event: string[];
}

export type Service = {
    ServiceID?: number;
    Service_Description: string;
    Cost: number;
    Notes: string;
    Funding_Account: string[];
    Main_Event: string[];
}

export type FundingAccount = {
    Card_Number: number;
    Expiry_Date: string;
    Holder: string;
    Status: string; // or enum
    Accommodation: string[];
    Local_Transport: string[];
    Venue: string[];
    Catering: string[];
    Flight: string[];
    Service: string[];
}

export type Canvassing = {
    CanvasingID?: number;
    Start_Time: string;
    End_Time: string;
    Trip: string[];
    Academic: string[];
}