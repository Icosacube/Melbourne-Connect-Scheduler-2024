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

const tripRouter = require("../controller/trip");
const app = express();
app.use(express.json());
app.use("/", tripRouter);

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

describe("Trips Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(null); 
  });

  describe("GET /trips", () => {
    it("should return all trips when cache is empty", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            StartDate: "2024-01-01",
            EndDate: "2024-01-10",
            GuestSpeaker: ["joe@email.com"],
            MainEvent: ["event1"],
          },
        },
        {
          id: "rec2",
          fields: {
            StartDate: "2024-01-01",
            EndDate: "2024-01-10",
            GuestSpeaker: ["doe@email.com"],
            MainEvent: ["event2"],
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/trips");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          StartDate: "2024-01-01",
          EndDate: "2024-01-10",
          GuestSpeaker: ["joe@email.com"],
          MainEvent: ["event1"],
          id: "rec1",
        },
        {
          StartDate: "2024-01-01",
          EndDate: "2024-01-10",
          GuestSpeaker: ["doe@email.com"],
          MainEvent: ["event2"],
          id: "rec2",
        },
      ]);
      expect(getCache).toHaveBeenCalledWith(Cachekeys.TRIPS);
      expect(getTable).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
      expect(setCache).toHaveBeenCalledWith(Cachekeys.TRIPS, expect.any(Array));
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/trips");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /trips/:trip_record_id", () => {
    it("should return a specific trip by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          StartDate: "2024-01-01",
          EndDate: "2024-01-10",
          GuestSpeaker: ["joe@email.com"],
          MainEvent: ["event1"],
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/trips/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: ["joe@email.com"],
        MainEvent: ["event1"],
        id: "rec1",
      });
    });

    it("should return 404 if the trip is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/trips/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("trip not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/trips/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /trips", () => {
    it("should create a new trip", async () => {
      const newTrip = {
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: ["joe@email.com"],
        MainEvent: ["event1"],
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app).post("/trips").send(newTrip);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Trip created successfully");
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newTrip },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.TRIPS);
    });

    it("should return 400 if Guest Speaker ID is not provided", async () => {
      const newTrip = {
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: undefined,
        MainEvent: ["event1"],
      };

      const response = await request(app).post("/trips").send(newTrip);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Guest Speaker ID is required");
      expect(createRecord).not.toHaveBeenCalled();
    });

    it("should return 500 if there is a server error", async () => {
      const newTrip = {
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: ["joe@email.com"],
        MainEvent: ["event1"],
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create trip")
      );

      const response = await request(app).post("/trips").send(newTrip);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create trip");
    });
  });

  describe("PUT /trips/:trip_record_id", () => {
    it("should update an existing trip", async () => {
      const updatedTrip = {
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: ["joe@email.com"],
        MainEvent: ["event1"],
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).put("/trips/rec1").send(updatedTrip);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Trip updated successfully");
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedTrip },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.TRIPS);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedTrip = {
        StartDate: "2024-01-01",
        EndDate: "2024-01-10",
        GuestSpeaker: ["joe@email.com"],
        MainEvent: ["event1"],
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update trip")
      );

      const response = await request(app).put("/trips/rec1").send(updatedTrip);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update trip");
    });
  });

  describe("DELETE /trips/:trip_record_id", () => {
    it("should delete an existing trip", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/trips/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Trip deleted successfully");
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.TRIPS);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete trip")
      );

      const response = await request(app).delete("/trips/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete trip");
    });
  });
});
