class Speaker {
    // possible to rename these just for convenience when inserting into db
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
    Emergency_Contact_Number: string;
    Flyer_Membership_Name: string;
    Flyer_Membership_Number: string;
    Bio: string;
    Headshot: string; // url to publicly accessible photos (google drive etc)
    Trip: string[]; 
    Event:	string[];
    Main_Event: string[];
    Confirmed: boolean;	
    
    constructor(id: number, req?:any) {
        this.SpeakerID = id;
        this.Primary_Email = req.email? req.email : ""
        this.Title = req.title? req.title : ""
        this.Alternative_Title = req.altTitle? req.altTitle : ""
        this.First_Name = req.firstName? req.firstName : ""
        this.Last_Name = req.lastName ? req.lastName : ""
        this.Gender = req.gender? req.gender: ""
        this.Time_zone = req.timezone? req.timezone : ""
        this.Phone = req.phoneNum? req.phoneNum : 0
        this.Work_Title = req.workTitle? req.workTitle : ""
        this.Organisation = req.organisation? req.organisation : ""
        this.Department = req.department? req.department: ""
        this.Address = req.address? req.address : ""
        this.City_Suburb = req.citySuburb ? req.citySuburb : ""
        this.State = req.state ? req.state : undefined
        this.Country = req.country? req.country : "" // possible to make an enum for it?
        this.Postcode = req.postcode? req.postcode : undefined
        this.Emergency_Contact_Name = req.emergencyContactName? req.emergencyContactName : ""
        this.Emergency_Contact_Number = req.emergencyContactNum? req.emergencyContactNum : ""
        this.Emergency_Contact_Relationship = req.emergencyContactRelation ? req.emergencyContactRelation : ""
        this.Flyer_Membership_Name = req.FlyerMemName? req.FlyerMemName : ""
        this.Flyer_Membership_Number = req.FlyerMemNum? req.FlyerMemName : ""
        this.Bio = req.bio ? req.bio : ""
        this.Headshot = req.imgUrl? req.imgUrl : ""
        this.Trip = []
        this.Event = []
        this.Main_Event = []
        this.Confirmed = false
    }
}

export default Speaker;