import request from "supertest";
import express from "express";

import { getTable, getRecord } from "../models/airtable";

jest.mock("../models/airtable");

const app = express();
const academicsRouter = require("../controller/Academic");
app.use(express.json());
app.use( academicsRouter);

describe("Academics Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /academics", () => {
    it("should return a list of academics", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            Name: "John Doe",
            Email: "john@example.com",
            MainEvent: "Event1",
            Canvassing: ["canvas1", "canvas2"],
          },
        },
        {
          id: "rec2",
          fields: {
            Name: "Jane Doe",
            Email: "jane@example.com",
            MainEvent: "Event2",
            Canvassing: ["canvas2"],
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/academics");
      console.log("Response Status:", response.status); // Debugging output
      console.log("Response Body:", response.body); // Debugging output
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: "rec1",
          Email: "john@example.com",
          Name: "John Doe",
          MainEvent: "Event1",
          Canvassing: ["canvas1", "canvas2"],
        },
        {
          id: "rec2",
          Email: "jane@example.com",
          Name: "Jane Doe",
          MainEvent: "Event2",
          Canvassing: ["canvas2"],
        },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/academics");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("GET /academics/:academic_record_id", () => {
    it("should return a specific academic by ID", async () => {
      const mockData = {
        id: "rec1",
        fields: {
          Name: "John Doe",
          Email: "john@example.com",
          MainEvent: "Event1",
          Canvassing: ["canvas1", "canvas2"],
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(Object.entries(mockData.fields).concat([["id", mockData.id]]))
      );

      const response = await request(app).get("/academics/rec1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: "rec1",
        Email: "john@example.com",
        Name: "John Doe",
        MainEvent: "Event1",
        Canvassing: ["canvas1", "canvas2"],
      });
    });

    it("should return 404 if the academic is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/academics/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("academic not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/academics/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });
});
