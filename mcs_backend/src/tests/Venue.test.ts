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

const venueRouter = require("../controller/Venue");
const app = express();
app.use(express.json());
app.use("/", venueRouter);

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

describe("Venues Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(null);
  });

  describe("GET /venues", () => {
    it("should return all venues when cache is empty", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            VenueName: "Conference Hall A",
            Location: "New York",
            Cost: 1000,
            MainEvent: ["mainEvent1"],
            FundingAccount: ["acc1", "acc2"],
          },
        },
        {
          id: "rec2",
          fields: {
            VenueName: "Conference Hall B",
            Location: "Los Angeles",
            Cost: 1000,
            MainEvent: ["mainEvent2"],
            FundingAccount: ["acc1"],
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/venues");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          VenueName: "Conference Hall A",
          Location: "New York",
          Cost: 1000,
          MainEvent: ["mainEvent1"],
          FundingAccount: ["acc1", "acc2"],
          id: "rec1",
        },
        {
          VenueName: "Conference Hall B",
          Location: "Los Angeles",
          Cost: 1000,
          MainEvent: ["mainEvent2"],
          FundingAccount: ["acc1"],
          id: "rec2",
        },
      ]);
      expect(getCache).toHaveBeenCalledWith(Cachekeys.VENUES);
      expect(getTable).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
      expect(setCache).toHaveBeenCalledWith(
        Cachekeys.VENUES,
        expect.any(Array)
      );
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/venues");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /venues/:venue_record_id", () => {
    it("should return a specific venue by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          VenueName: "Conference Hall A",
          Location: "New York",
          Cost: 1000,
          MainEvent: ["mainEvent1"],
          FundingAccount: ["acc1", "acc2"],
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/venues/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        VenueName: "Conference Hall A",
        Location: "New York",
        Cost: 1000,
        MainEvent: ["mainEvent1"],
        FundingAccount: ["acc1", "acc2"],
        id: "rec1",
      });
    });

    it("should return 404 if the venue is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/venues/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("venue not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/venues/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /venues", () => {
    it("should create a new venue", async () => {
      const newVenue = {
        VenueName: "Conference Hall C",
        Location: "Las Vegas",
        Cost: 6666,
        MainEvent: ["mainEvent2"],
        FundingAccount: ["acc14"],
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app).post("/venues").send(newVenue);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Venue created successfully");
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newVenue },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.VENUES);
    });

    it("should return 500 if there is a server error", async () => {
      const newVenue = {
        VenueName: "Conference Hall C",
        Location: "Las Vegas",
        Cost: 6666,
        MainEvent: ["mainEvent2"],
        FundingAccount: ["acc14"],
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create venue")
      );

      const response = await request(app).post("/venues").send(newVenue);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create venue");
    });
  });

  describe("PUT /venues/:venue_record_id", () => {
    it("should update an existing venue", async () => {
      const updatedVenue = {
        VenueName: "Conference Hall D",
        Location: "Miami",
        Cost: 11111,
        MainEvent: ["mainEvent3"],
        FundingAccount: ["acc4"],
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/venues/rec1")
        .send(updatedVenue);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Venue updated successfully");
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedVenue }, 
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.VENUES);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedVenue = {
        VenueName: "Conference Hall D",
        Location: "Miami",
        Cost: 1800,
        MainEvent: ["mainEvent4"],
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update venue")
      );

      const response = await request(app)
        .put("/venues/rec1")
        .send(updatedVenue);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update venue");
    });
  });

  describe("DELETE /venues/:venue_record_id", () => {
    it("should delete an existing venue", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/venues/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Venue deleted successfully");
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.VENUES);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete venue")
      );

      const response = await request(app).delete("/venues/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete venue");
    });
  });
});
