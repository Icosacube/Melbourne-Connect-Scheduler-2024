const events: any[] = []
/**
 * Handles (main?) Event requests
 */
module.exports = function(app:any) {
    
    // Get all events
    app.get("/event", async (req:any, res:any, next:any) => {
        console.log("get all events");
        try {
            res.sendStatus(200);
            res.json(events);
        } catch (err) {
            res.sendStatus(404);
            console.error(err);
        }
    })

    // Create a new event
    app.post("/event", async (req:any, res:any, next:any) => {

    })

    // Update existing event
    app.put("/event/:eventID", async (req:any, res:any, next:any) => {
        req.params.eventID
    })

    // delete existing event
    app.delete("/event/:eventID", async (req:any, res:any, next:any) => {})
}