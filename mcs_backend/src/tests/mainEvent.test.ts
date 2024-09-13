import request from "supertest";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";
import { getCache, setCache, deleteCache } from '../utils/caching';

const mainEventRouter = require("../controller/mainEvent"); 

const app = express();
app.use(express.json());
app.use("/", mainEventRouter);

jest.mock("../models/airtable", () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));
jest.mock('../utils/caching', () => ({
    getCache: jest.fn(),
    setCache: jest.fn(),
    deleteCache: jest.fn(),
  }));

describe("Main Events Controller Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(undefined);
  });

  describe("GET /main-events", () => {
    it("should return all main events", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            EventName: "Event 1",
            EventAbstract: "Abstract1",
            Speaker: ["speaker1", "speaker2"],
            trip: ["trip1"],
            Date: "2024-09-06",
            Notes: "Amazing event",
          },
        },
        {
          id: "rec2",
          fields: {
            EventName: "Event 1",
            EventAbstract: "Abstract1",
            Speaker: ["speaker4", "speaker5"],
            trip: ["trip6"],
            Date: "2024-08-06",
            Notes: "Bad event",
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/main-events");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          EventName: "Event 1",
          EventAbstract: "Abstract1",
          Speaker: ["speaker1", "speaker2"],
          trip: ["trip1"],
          Date: "2024-09-06",
          Notes: "Amazing event",
          id: "rec1",
        },
        {
          EventName: "Event 1",
          EventAbstract: "Abstract1",
          Speaker: ["speaker4", "speaker5"],
          trip: ["trip6"],
          Date: "2024-08-06",
          Notes: "Bad event",
          id: "rec2",
        },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/main-events");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /main-events/:main_event_record_id", () => {
    it("should return a specific main event by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          EventName: "Event 1",
          EventAbstract: "Abstract1",
          Speaker: ["speaker1", "speaker2"],
          trip: ["trip1"],
          Date: "2024-09-06",
          Notes: "Amazing event",
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/main-events/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        EventName: "Event 1",
        EventAbstract: "Abstract1",
        Speaker: ["speaker1", "speaker2"],
        trip: ["trip1"],
        Date: "2024-09-06",
        Notes: "Amazing event",
        id: "rec1",
      });
    });

    it("should return 404 if the main event is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/main-events/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Main Event not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/main-events/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /main-events", () => {
    it("should create a new main event", async () => {
      const newMainEvent = {
        EventName: "Event 3",
        EventAbstract: "Abstract3",
        Speaker: ["speaker666"],
        trip: ["trip12"],
        Date: "2026-09-06",
        Notes: "Amazing event",
      };

      (createRecord as jest.Mock).mockResolvedValue(["rec4"]);

      const response = await request(app)
        .post("/main-events")
        .send(newMainEvent);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("new Main Event created successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create new Main event")
      );

      const newMainEvent = {
        EventName: "Event 3",
        EventAbstract: "Abstract3",
        Speaker: ["speaker666"],
        trip: ["trip12"],
        Date: "2026-09-06",
        Notes: "Amazing event",
      };

      const response = await request(app)
        .post("/main-events")
        .send(newMainEvent);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create new Main event");
    });
  });

  describe("PUT /main-events/:main_event_record_id", () => {
    it("should update an existing main event", async () => {
      const updatedMainEvent = {
        EventName: "Changed Event",
        EventAbstract: "New Abstract",
        Speaker: ["speaker666"],
        trip: ["trip12"],
        Date: "2026-09-06",
        Notes: "Amazing event",
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/main-events/rec1")
        .send(updatedMainEvent);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("main Event updated successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Main event could not be updated")
      );

      const updatedMainEvent = {
        EventName: "Changed Event",
        EventAbstract: "New Abstract",
        Speaker: ["speaker666"],
        trip: ["trip12"],
        Date: "2026-09-06",
        Notes: "Amazing event",
      };

      const response = await request(app)
        .put("/main-events/rec1")
        .send(updatedMainEvent);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Main event could not be updated");
    });
  });

  describe("DELETE /main-events/:main_event_record_id", () => {
    it("should delete an existing main event", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/main-events/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("main Event deleted successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete Main Event")
      );

      const response = await request(app).delete("/main-events/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete main event");
    });
  });
});
