
export enum PresetFilter {
    completed = "( {Completed} = FALSE() )",
}

export type TableFields = {
        id?: string;
        fields: Speaker | Trip | Main_Event;
}

type Speaker = {
    SpeakerID: number;
    Primary_Email: string;
    Title: string;
    Alternative_Title: string;
    First_Name: string;
    Last_Name: string;
    Gender: string;
    Time_zone: string;
    Phone: number; 
    Job_Title: string;
    Organisation: string;
    Department: string;
    Address: string;
    City_Suburb: string;	
    State_Postcode: string;
    Emergency_Contact_Name: string;	
    Emergency_Contact_Relationship: string;
    Emergency_Contact_Number: string;
    Flyer_Membership_Name: string;
    Flyer_Membership_Number: string;
    Bio: string;
    Headshot: string; // url to publicly accessible photos (google drive etc)
    Trip: string[]; 
    Event:	string[];
    Main_Event: string[];
    Confirmed: boolean;	
}

type Trip = {
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

type Main_Event = {
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

