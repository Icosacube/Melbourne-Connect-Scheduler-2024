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

const speakerRouter = require("../controller/speaker");
const app = express();
app.use(express.json());
app.use("/", speakerRouter);

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

describe("Speakers Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(null);
  });

  describe("GET /speakers", () => {
    it("should return all speakers ", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            Name: "elon",
            Email: "elon@example.com",
            MainEvent: ["mainEvent-id1"],
            SubEvent: ["subEvent-id1"],
            title: "CEO",
            Bio: "CEO of Earth",
            Phone: "6666666",
          },
        },
        {
          id: "rec2",
          fields: {
            Name: "Musk",
            Email: "musk@example.com",
            MainEvent: ["mainEvent-id2"],
            SubEvent: ["subEvent-id2"],
            title: "CTO",
            Bio: "CTO of Earth",
            Phone: "77777777",
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/speakers");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          Name: "elon",
          Email: "elon@example.com",
          MainEvent: ["mainEvent-id1"],
          SubEvent: ["subEvent-id1"],
          title: "CEO",
          Bio: "CEO of Earth",
          Phone: "6666666",
          id: "rec1",
        },
        {
          Name: "Musk",
          Email: "musk@example.com",
          MainEvent: ["mainEvent-id2"],
          SubEvent: ["subEvent-id2"],
          title: "CTO",
          Bio: "CTO of Earth",
          Phone: "77777777",
          id: "rec2",
        },
      ]);
      expect(getCache).toHaveBeenCalledWith(Cachekeys.SPEAKERS);
      expect(getTable).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
      expect(setCache).toHaveBeenCalledWith(
        Cachekeys.SPEAKERS,
        expect.any(Array)
      );
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/speakers");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /speakers/:speaker_record_id", () => {
    it("should return a specific speaker by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          Name: "elon",
          Email: "elon@example.com",
          MainEvent: ["mainEvent-id1"],
          SubEvent: ["subEvent-id1"],
          title: "CEO",
          Bio: "CEO of Earth",
          Phone: "6666666",
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/speakers/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        Name: "elon",
        Email: "elon@example.com",
        MainEvent: ["mainEvent-id1"],
        SubEvent: ["subEvent-id1"],
        title: "CEO",
        Bio: "CEO of Earth",
        Phone: "6666666",
        id: "rec1",
      });
    });

    it("should return 404 if the speaker is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/speakers/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Speaker not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/speakers/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /speakers", () => {
    it("should create a new speaker", async () => {
      const newSpeaker = {
        Name: "John Doe",
        Email: "john@example.com",
        MainEvent: ["mainEvent-id1"],
        SubEvent: ["subEvent-id1"],
        title: "Speaker",
        Bio: "Public Speaker",
        Phone: "123456789",
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app).post("/speakers").send(newSpeaker);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Speaker created successfully");
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newSpeaker },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SPEAKERS);
    });

    it("should return 500 if there is a server error", async () => {
      const newSpeaker = {
        Name: "John Doe",
        Email: "john@example.com",
        MainEvent: ["mainEvent-id1"],
        SubEvent: ["subEvent-id1"],
        title: "Speaker",
        Bio: "Public Speaker",
        Phone: "123456789",
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create speaker")
      );

      const response = await request(app).post("/speakers").send(newSpeaker);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create speaker");
    });
  });

  describe("PUT /speakers/:speaker_record_id", () => {
    it("should update an existing speaker", async () => {
      const updatedSpeaker = {
        Name: "John Doe",
        Email: "john.doe@example.com",
        MainEvent: ["mainEvent-id2"],
        SubEvent: ["subEvent-id2"],
        title: "Lead Speaker",
        Bio: "Experienced Public Speaker",
        Phone: "987654321",
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/speakers/rec1")
        .send(updatedSpeaker);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Speaker updated successfully");
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedSpeaker },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SPEAKERS);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedSpeaker = {
        Name: "John Doe",
        Email: "john.doe@example.com",
        MainEvent: ["mainEvent-id2"],
        SubEvent: ["subEvent-id2"],
        title: "Lead Speaker",
        Bio: "Experienced Public Speaker",
        Phone: "987654321",
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update speaker")
      );

      const response = await request(app)
        .put("/speakers/rec1")
        .send(updatedSpeaker);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update speaker");
    });
  });

  describe("DELETE /speakers/:speaker_record_id", () => {
    it("should delete an existing speaker", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/speakers/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Speaker deleted successfully");
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.SPEAKERS);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete speaker")
      );

      const response = await request(app).delete("/speakers/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete speaker");
    });
  });
});
