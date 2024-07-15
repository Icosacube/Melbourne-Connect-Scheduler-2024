class MainEvent {
  id: number;
  name: string;
  eventAbstract: string;
  description: string;
  date: Date;
  speakers: string[];
  catering: string;
  venue: string;

  // type guard (sample for validating request bodies)
  private isNumber(obj: any): obj is number {
    return obj !== undefined;
  }

  constructor(id: number, req?: any) {
    this.id = id;
    this.name = "";
    this.eventAbstract = "";
    this.description = "";
    this.date = new Date();
    this.speakers = [];
    this.catering = "";
    this.venue = "";
    // can't explicitly overload
    if (req != null) {
      for (const [key, value] of Object.entries(req)) {
        switch (key) {
          case "name":
            this.name = value as string;
            break;
          case "talkAbstract":
            this.eventAbstract = value as string;
            break;
          case "eventDescription":
            this.description = value as string;
            break;
          case "date":
            // frontend may send it as a DayJS object instead of a raw string
            this.date = new Date(value as string);
            break;
          case "speakers":
            this.speakers = value as string[];
            break;
          case "catering":
            this.catering = value as string;
            break;
          case "venue":
            this.venue = value as string;
            break;
          default:
            console.log("unknown value " + key);
        }
      }
    }
  }
}

export default MainEvent;
