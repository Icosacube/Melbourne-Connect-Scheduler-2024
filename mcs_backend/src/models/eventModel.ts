class MainEvent {
    id: number;
    name: string;
    eventAbstract: string;
    description: string;
    date: Date;
    speakers: string[];
    catering: string;
    venue: string;

    constructor(id: number) {
        this.id = id;
        this.name = "";
        this.eventAbstract = "";
        this.description = "";
        this.date = new Date();
        this.speakers = []
        this.catering = "";
        this.venue = "";
    };

    // TODO: overload constructors so we can load them in from DB
}