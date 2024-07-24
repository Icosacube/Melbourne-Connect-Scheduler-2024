import { MainEvent } from "../types/types";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";

const router = express.Router();

// get all events
router.get("/event", async (req, res) => {
  try {
    const events = await getTable("MainEvent", "");
    const formattedEvents: { id: string; fields: any }[] = [];
    events.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedEvents.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedEvents).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create new event
router.post("/event", async (req, res) => {
  try {
    const newEvent: MainEvent = req.body;
    const eventRecord = {
      fields: newEvent,
    };

    await createRecord(String(process.env.MAINEVENT), [eventRecord]);
    res.status(200).json({ message: "Event created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Event could not be created" });
  }
});

// update event with givent event ID
router.put("/event/:eventID", async (req, res) => {
  const { eventID } = req.params;
  const updatedEvent: MainEvent = req.body;

  const updatedRecord = {
    id: eventID,
    fields: updatedEvent,
  };

  try {
    await updateRecord("MainEvent", [updatedRecord]);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Event could not be updated" });
  }
});

// delete specific event
router.delete("/event/:eventID", async (req, res) => {
  const { eventID } = req.params;
  try {
    await deleteRecords("MainEvent", [eventID]);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Failed to delete flight:", err);
    res.status(500).json({ error: "Failed to delete flight" });
  }
});

module.exports = router;

// module.exports = function (app: any) {
//   // Get all events
//   app.get("/event", async (req: any, res: any, next: any) => {
//     console.log("get all events");
//     try {
//       res.json(events);
//     } catch (err) {
//       res.sendStatus(404);
//       console.error(err);
//     }
//   });

//   // Create a new event
//   app.post("/event", async (req: any, res: any, next: any) => {
//     // cast request body to Main Event
//     try {
//       let body = await req.body;
//       let newEvent = new MainEvent(events.length, (req = body));
//       events.push(newEvent);
//       console.log(newEvent);
//       res.sendStatus(200);
//     } catch (err) {
//       res.sendStatus(400);
//       console.error(err);
//     }
//   });

//   // Update existing event
//   app.put("/event/:eventID", async (req: any, res: any, next: any) => {
//     try {
//       if (req.params.eventID >= 0 && eventExists(req.params.eventID)) {
//         let body = await req.body;
//         let newEvent = new MainEvent(req.params.eventID, (req = body));
//         const index = events.findIndex(
//           (event) => (event.id = req.params.eventID)
//         );
//         events[index] = newEvent;
//         // assert that the ID remains the same?
//         // possible that the ID got updated but what Ever
//       }
//     } catch (err) {
//       res.sendStatus(400);
//       console.error(err);
//     }
//   });

//   // delete existing event
//   app.delete("/event/:eventID", async (req: any, res: any, next: any) => {
//     try {
//       if (req.params.eventID >= 0 && eventExists(req.params.eventID)) {
//         // find its index in the array
//         const index = events.findIndex(
//           (event) => (event.id = req.params.eventID)
//         );
//         events.splice(index, 1);
//       }
//     } catch (err) {
//       res.sendStatus(400);
//       console.error(err);
//     }
//   });
// };
