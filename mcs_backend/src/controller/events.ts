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

}