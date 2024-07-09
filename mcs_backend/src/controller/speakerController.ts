import Speaker from "models/speakerModel";

const speakers: Speaker[] = []

module.exports = function (app: any) {
    
    // get all speakers
    app.get("/speaker", async (req: any, res: any, next: any) => {
        try {
            res.json(speakers)
        } catch (err) {
            res.sendStatus(404);
            console.error(err);
        }
    })

    // create a new speaker
    app.post("/speaker", async (req: any, res: any, next: any) => {
        try {
            let body = await req.body
            let newSpeaker = new Speaker(speakers.length, req=body);
            speakers.push(newSpeaker);
            console.log(newSpeaker);
            res.sendStatus(200);
          } catch (err) {}
    })
}