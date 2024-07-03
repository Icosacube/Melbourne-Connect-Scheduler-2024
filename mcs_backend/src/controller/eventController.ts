import MainEvent from "../models/eventModel";

const events: MainEvent[] = [new MainEvent(0)];

function eventExists(eventId:number) {
  return events.some((event) => event.id == eventId)
}

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
      let newEvent = new MainEvent(events.length, req=body);
      events.push(newEvent);
      console.log(newEvent);
      res.sendStatus(200);
    } catch (err) {}
  });

  // Update existing event
  app.put("/event/:eventID", async (req: any, res: any, next: any) => {
    if (req.params.eventID >= 0 && eventExists(req.params.eventID)) {
      let body = await req.body
      let newEvent = new MainEvent(req.params.eventID, req=body);
      const index = events.findIndex((event) => event.id = req.params.eventID)
      events[index] = newEvent
      // assert that the ID remains the same?
      // possible that the ID got updated but what Ever
    }
  });

  // delete existing event
  app.delete("/event/:eventID", async (req: any, res: any, next: any) => {
    if (req.params.eventID >= 0 && eventExists(req.params.eventID)) {
      // find its index in the array
      const index = events.findIndex((event) => event.id = req.params.eventID)
      events.splice(index, 1)
    }
  });
};
