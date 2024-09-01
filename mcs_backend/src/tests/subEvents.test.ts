import request from "supertest";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";
import { getCache, setCache, deleteCache } from "../utils/caching";
import { Cachekeys } from "../Enum/Cachekeys";

const subEventRouter = require("../controller/subEvent"); 
const app = express();
app.use(express.json());
app.use("/", subEventRouter);

jest.mock("../models/airtable", () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

jest.mock("../utils/caching", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
  deleteCache: jest.fn(),
}));

describe("SubEvents Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(null); 
  });

  describe("GET /sub-events", () => {
    it("should return all sub-events when cache is empty", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            EventName: "SubEvent1",
            EventDescription: "Description 1",
            EventType: "Meet and Greet",
            MainEvent: ["mainEvent1"],
            speakers: ["speaker1", "speaker2"],
            StartDate: "2024-09-06",
            EndDate: "2024-09-07",
          },
        },
        {
          id: "rec2",
          fields: {
            EventName: "SubEvent2",
            EventDescription: "Description 2",
            EventType: "Meet and Greet",
            MainEvent: ["mainEvent2"],
            speakers: ["speaker3"],
            StartDate: "2024-09-06",
            EndDate: "2024-09-07",
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/sub-events");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          EventName: "SubEvent1",
          EventDescription: "Description 1",
          EventType: "Meet and Greet",
          MainEvent: ["mainEvent1"],
          speakers: ["speaker1", "speaker2"],
          StartDate: "2024-09-06",
          EndDate: "2024-09-07",
          id: "rec1",
        },
        {
          EventName: "SubEvent2",
          EventDescription: "Description 2",
          EventType: "Meet and Greet",
          MainEvent: ["mainEvent2"],
          speakers: ["speaker3"],
          StartDate: "2024-09-06",
          EndDate: "2024-09-07",
          id: "rec2",
        },
      ]);
      expect(getCache).toHaveBeenCalledWith(Cachekeys.SUBEVENTS);
      expect(getTable).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
      expect(setCache).toHaveBeenCalledWith(
        Cachekeys.SUBEVENTS,
        expect.any(Array)
      );
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/sub-events");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /sub-events/:sub_event_id", () => {
    it("should return a specific sub-event by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          EventName: "SubEvent1",
          EventDescription: "Description 1",
          EventType: "Meet and Greet",
          MainEvent: ["mainEvent1"],
          speakers: ["speaker1", "speaker2"],
          StartDate: "2024-09-06",
          EndDate: "2024-09-07",
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/sub-events/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        EventName: "SubEvent1",
        EventDescription: "Description 1",
        EventType: "Meet and Greet",
        MainEvent: ["mainEvent1"],
        speakers: ["speaker1", "speaker2"],
        StartDate: "2024-09-06",
        EndDate: "2024-09-07",
        id: "rec1",
      });
    });

    it("should return 404 if the sub-event is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/sub-events/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Sub event not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to fetch sub event")
      );

      const response = await request(app).get("/sub-events/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch sub event");
    });
  });

  describe("POST /sub-events", () => {
    it("should create a new sub-event", async () => {
      const newSubEvent = {
        EventName: "SubEvent3",
        EventDescription: "Description 3",
        EventType: "Lunch",
        MainEvent: ["mainEvent3"],
        speakers: ["speaker4"],
        StartDate: "2024-09-06",
        EndDate: "2024-09-06",
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app).post("/sub-events").send(newSubEvent);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Subevent created successfully");
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newSubEvent },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SUBEVENTS);
    });

    it("should return 500 if there is a server error", async () => {
      const newSubEvent = {
        EventName: "SubEvent3",
        EventDescription: "Description 3",
        EventType: "Lunch",
        MainEvent: ["mainEvent3"],
        speakers: ["speaker4"],
        StartDate: "2024-09-06",
        EndDate: "2024-09-06",
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create new sub event")
      );

      const response = await request(app).post("/sub-events").send(newSubEvent);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create new sub event");
    });
  });

  describe("PUT /sub-events/:sub_event_id", () => {
    it("should update an existing sub-event", async () => {
      const updatedSubEvent = {
        EventName: "SubEvent3",
        EventDescription: "Description 3",
        EventType: "Dinner",
        MainEvent: ["mainEvent5"],
        speakers: ["speaker2"],
        StartDate: "2024-10-06",
        EndDate: "2024-010-06",
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/sub-events/rec1")
        .send(updatedSubEvent);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Subevent updated successfully");
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedSubEvent },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SUBEVENTS);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedSubEvent = {
        EventName: "SubEvent3",
        EventDescription: "Description 3",
        EventType: "Dinner",
        MainEvent: ["mainEvent5"],
        speakers: ["speaker2"],
        StartDate: "2024-10-06",
        EndDate: "2024-010-06",
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Sub event could not be updated")
      );

      const response = await request(app)
        .put("/sub-events/rec1")
        .send(updatedSubEvent);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Sub event could not be updated");
    });
  });

  describe("DELETE /sub-events/:sub_event_id", () => {
    it("should delete an existing sub-event", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/sub-events/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Subevent deleted successfully");
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SUBEVENTS);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete sub event")
      );

      const response = await request(app).delete("/sub-events/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete sub event");
    });
  });
});
