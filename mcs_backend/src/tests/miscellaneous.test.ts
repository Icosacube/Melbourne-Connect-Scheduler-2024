import request from "supertest";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";

const miscellaneousRouter = require("../controller/miscellaneous"); 
const app = express();
app.use(express.json());
app.use("/", miscellaneousRouter);

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

describe("Miscellaneous Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /miscellaneous", () => {
    it("should return all miscellaneous items", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            Description: "Misc 1",
            Cost: 100,
            MainEvent: "mainEvent1",
            FundingAccount: "0001",
            Trip: ["trip1"],
            Date: "2024-12-01",
          },
        },
        {
          id: "rec2",
          fields: {
            Description: "Misc 2",
            Cost: 200,
            MainEvent: "mainEvent2",
            FundingAccount: "0002",
            Trip: ["trip2"],
            Date: "2024-10-10",
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/miscellaneous");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          Description: "Misc 1",
          Cost: 100,
          MainEvent: "mainEvent1",
          FundingAccount: "0001",
          Trip: ["trip1"],
          Date: "2024-12-01",
          id: "rec1",
        },
        {
          Description: "Misc 2",
          Cost: 200,
          MainEvent: "mainEvent2",
          FundingAccount: "0002",
          Trip: ["trip2"],
          Date: "2024-10-10",
          id: "rec2",
        },
      ]);
      expect(getTable).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/miscellaneous");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /miscellaneous/:miscellaneous_record_id", () => {
    it("should return a specific miscellaneous item by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          Description: "Misc 1",
          Cost: 100,
          MainEvent: "mainEvent1",
          FundingAccount: "0001",
          Trip: ["trip1"],
          Date: "2024-12-01",
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/miscellaneous/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        Description: "Misc 1",
        Cost: 100,
        MainEvent: "mainEvent1",
        FundingAccount: "0001",
        Trip: ["trip1"],
        Date: "2024-12-01",
        id: "rec1",
      });
    });

    it("should return 404 if the miscellaneous item is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/miscellaneous/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Miscellaneous not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/miscellaneous/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /miscellaneous/:tripID", () => {
    it("should create a new miscellaneous item for a trip", async () => {
      const newMiscellaneousItem = {
        Description: "Misc 3",
        Cost: 400,
        MainEvent: "mainEvent1",
        FundingAccount: "0003",
        Trip: ["trip4"],
        Date: "2024-12-01",
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app)
        .post("/miscellaneous/trip4")
        .send(newMiscellaneousItem);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        "Miscellaneous item created successfully"
      );
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newMiscellaneousItem },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      const newMiscellaneousItem = {
        Description: "Misc 3",
        Cost: 400,
        MainEvent: "mainEvent3",
        FundingAccount: "0003",
        Trip: ["trip4"],
        Date: "2024-12-01",
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create miscellaneous item")
      );

      const response = await request(app)
        .post("/miscellaneous/tripNew")
        .send(newMiscellaneousItem);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create miscellaneous item");
    });
  });

  describe("PUT /miscellaneous/:miscellaneous_record_id", () => {
    it("should update an existing miscellaneous item", async () => {
      const updatedMiscellaneousItem = {
        Description: "Misc 5",
        Cost: 400,
        MainEvent: "mainEvent4",
        FundingAccount: "0003",
        Trip: ["trip4"],
        Date: "2024-12-01",
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/miscellaneous/rec1")
        .send(updatedMiscellaneousItem);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Miscellaneous item updated successfully"
      );
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedMiscellaneousItem },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedMiscellaneousItem = {
        Description: "Misc 5",
        Cost: 400,
        MainEvent: "mainEvent4",
        FundingAccount: "0003",
        Trip: ["trip4"],
        Date: "2024-12-01",
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update miscellaneous item")
      );

      const response = await request(app)
        .put("/miscellaneous/rec1")
        .send(updatedMiscellaneousItem);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update miscellaneous item");
    });
  });

  describe("DELETE /miscellaneous/:miscellaneous_record_id", () => {
    it("should delete an existing miscellaneous item", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/miscellaneous/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Miscellaneous item deleted successfully"
      );
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete miscellaneous item")
      );

      const response = await request(app).delete("/miscellaneous/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete miscellaneous item");
    });
  });
});
