import Speaker from "models/speakerModel";

const speakers: Speaker[] = [];

function speakerExists(id: number) {
  return speakers.some((speaker) => speaker.SpeakerID == id);
}

module.exports = function (app: any) {
  // get all speakers
  app.get("/speaker", async (req: any, res: any, next: any) => {
    try {
      res.json(speakers);
    } catch (err) {
      res.sendStatus(400);
      console.error(err);
    }
  });

  // create a new speaker
  app.post("/speaker", async (req: any, res: any, next: any) => {
    try {
      let body = await req.body;
      let newSpeaker = new Speaker(speakers.length, (req = body));
      speakers.push(newSpeaker);
      console.log(newSpeaker);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(400);
      console.error(err);
    }
  });

  // get specific speaker
  app.get("/speaker/:speakerID", async (req: any, res: any, next: any) => {
    try {
      if (speakerExists(req.params.speakerID)) {
        const speaker = speakers.find(
          (speaker) => (speaker.SpeakerID = req.params.speakerID)
        );
        res.json(speaker);
      } else {
        throw new Error("Speaker not found");
      }
    } catch (err) {
      res.sendStatus(400);
      console.error(err);
    }
  });

  // update specific speaker
  app.put("/speaker/:speakerID", async (req: any, res: any, next: any) => {
    try {
      if (speakerExists(req.params.speakerID)) {
        let body = await req.body;
        let newEvent = new Speaker(req.params.speakerID, (req = body));
        const index = speakers.findIndex(
          (speaker) => (speaker.SpeakerID = req.params.speakerID)
        );
        speakers[index] = newEvent;
      } else {
        throw new Error("Speaker not found");
      }
    } catch (err) {
      res.sendStatus(400);
      console.error(err);
    }
  });

  // delete speaker
  app.delete("/speaker/:speakerID", async (req: any, res: any, next: any) => {
    try {
      if (speakerExists(req.params.speakerID)) {
        const index = speakers.findIndex(
          (speaker) => (speaker.SpeakerID = req.params.speakerID)
        );
        speakers.splice(index,1)
      } else {
        throw new Error("Speaker not found");
      }
    } catch (err) {
      res.sendStatus(400);
      console.error(err);
    }
  });
};
