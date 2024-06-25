class MainEvent {
  id: number;
  name: string;
  eventAbstract: string;
  description: string;
  date: Date;
  speakers: string[];
  catering: string;
  venue: string;
  banner: "";

  constructor(id: number) {
    this.id = id;
    this.name = "";
    this.eventAbstract = "";
    this.description = "";
    this.date = new Date();
    this.speakers = [];
    this.catering = "";
    this.venue = "";
    this.banner = "";
  }

  // TODO: overload constructors so we can load them in from DB
}

const events: MainEvent[] = [new MainEvent(0)];

/**
 * Handles (main?) Event requests
 */
module.exports = function (app: any) {
  // Get all events
  app.get("/event", async (req: any, res: any, next: any) => {
    console.log("get all events");
    try {
      res.json(events);
    } catch (err) {
      res.sendStatus(404);
      console.error(err);
    }
  });

  // Create a new event
  app.post("/event", async (req: any, res: any, next: any) => {
    // cast request body to Main Event
    try {
      let body = await req.body
      let newEvent = new MainEvent(events.length);
      // this accounts for the case where request body doesn't have some values for some reason
      for (const [key, value] of Object.entries(body)) {
        switch (key) {
          case "name":
            newEvent.name = value as string;
            break;
          case "talkAbstract":
            newEvent.eventAbstract = value as string;
            break;
          case "eventDescription":
            newEvent.description = value as string;
            break;
          case "date":
            newEvent.date = new Date(value as string);
            break;
          case "speakers":
            newEvent.speakers = value as string[];
            break;
          case "catering":
            newEvent.catering = value as string;
            break;
          case "venue":
            newEvent.venue = value as string;
            break;
          default:
            console.log("unknown value " + key);
        }
      }
      events.push(newEvent);
      console.log(newEvent);
      res.sendStatus(200);
    } catch (err) {}
  });

  // Update existing event
  app.put("/event/:eventID", async (req: any, res: any, next: any) => {
    req.params.eventID;
  });

  // delete existing event
  app.delete("/event/:eventID", async (req: any, res: any, next: any) => {});
};
