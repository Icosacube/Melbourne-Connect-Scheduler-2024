import request from "supertest";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";

const accommodationRouter = require("../controller/accommodation");

const app = express();
app.use(express.json());
app.use("/", accommodationRouter);

jest.mock("../models/airtable", () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

describe("Accommodation Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /accommodations", () => {
    it("should return all accommodations", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            RECORDID: "rec1",
            TripRecordID: ["trip1", "trip2"],
            EventID: "event1",
            BookingReference: 123,
            HotelName: "California",
            Address: "Los Angeles",
            Room: 666,
            CheckIn: "2024-08-07",
            CheckOut: "2024-09-06",
            NumberOfNight: 30,
            Cost: 66666,
            ExpenseDate: "2024-09-06",
            Notes: "Amazing",
          },
        },
        {
          id: "rec2",
          fields: {
            RECORDID: "rec2",
            TripRecordID: ["trip3", "trip4"],
            EventID: "event2",
            BookingReference: 333,
            HotelName: "California",
            Address: "Santa Monica",
            Room: 888,
            CheckIn: "2024-08-07",
            CheckOut: "2024-09-06",
            NumberOfNight: 30,
            Cost: 66666,
            ExpenseDate: "2024-09-06",
            Notes: "AWESOME",
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/accommodations");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          RECORDID: "rec1",
          TripRecordID: ["trip1", "trip2"],
          EventID: "event1",
          BookingReference: 123,
          HotelName: "California",
          Address: "Los Angeles",
          Room: 666,
          CheckIn: "2024-08-07",
          CheckOut: "2024-09-06",
          NumberOfNight: 30,
          Cost: 66666,
          ExpenseDate: "2024-09-06",
          Notes: "Amazing",
          id: "rec1",
        },
        {
          RECORDID: "rec2",
          TripRecordID: ["trip3", "trip4"],
          EventID: "event2",
          BookingReference: 333,
          HotelName: "California",
          Address: "Santa Monica",
          Room: 888,
          CheckIn: "2024-08-07",
          CheckOut: "2024-09-06",
          NumberOfNight: 30,
          Cost: 66666,
          ExpenseDate: "2024-09-06",
          Notes: "AWESOME",
          id: "rec2",
        },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      (getTable as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/accommodations");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("GET /accommodations/:accommodation_record_id", () => {
    it("should return a specific accommodation by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          RECORDID: "rec1",
          TripRecordID: ["trip1", "trip2"],
          EventID: "event1",
          BookingReference: 123,
          HotelName: "California",
          Address: "Los Angeles",
          Room: 666,
          CheckIn: "2024-08-07",
          CheckOut: "2024-09-06",
          NumberOfNight: 30,
          Cost: 66666,
          ExpenseDate: "2024-09-06",
          Notes: "Amazing",
        },
      };
      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );
      const response = await request(app).get("/accommodations/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        RECORDID: "rec1",
        TripRecordID: ["trip1", "trip2"],
        EventID: "event1",
        BookingReference: 123,
        HotelName: "California",
        Address: "Los Angeles",
        Room: 666,
        CheckIn: "2024-08-07",
        CheckOut: "2024-09-06",
        NumberOfNight: 30,
        Cost: 66666,
        ExpenseDate: "2024-09-06",
        Notes: "Amazing",
        id: "rec1",
      });
    });

    it("should return 404 if the accommodation is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/accommodations/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Accommodation not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get(
        "/accommodations/rec45qGQC3Ips3iBN"
      );
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /accommodations", () => {
    it("should create a new accommodation", async () => {
      const newAccommodation = {
        TripRecordID: ["trip1", "trip2"],
        EventID: "event1",
        BookingReference: 123,
        HotelName: "California",
        Address: "Los Angeles",
        Room: 666,
        CheckIn: "2024-08-07",
        CheckOut: "2024-09-06",
        NumberOfNight: 30,
        Cost: 66666,
        ExpenseDate: "2024-09-06",
        Notes: "Amazing",
      };

      (createRecord as jest.Mock).mockResolvedValue(["rec666"]);

      const response = await request(app)
        .post("/accommodations")
        .send(newAccommodation);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Accommodation created successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create accommodation")
      );

      const newAccommodation = {
        TripRecordID: ["trip1", "trip2"],
        EventID: "event1",
        BookingReference: 123,
        HotelName: "California",
        Address: "Los Angeles",
        Room: 666,
        CheckIn: "2024-08-07",
        CheckOut: "2024-09-06",
        NumberOfNight: 30,
        Cost: 66666,
        ExpenseDate: "2024-09-06",
        Notes: "Amazing",
      };

      const response = await request(app)
        .post("/accommodations")
        .send(newAccommodation);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create accommodation");
    });
  });

  describe("PUT /accommodations/:accommodation_record_id", () => {
    it("should update an existing accommodation", async () => {
      const updatedAccommodation = {
        TripRecordID: ["trip5", "trip2"],
        EventID: "event1",
        BookingReference: 123,
        HotelName: "California",
        Address: "Los Santos",
        Room: 666,
        CheckIn: "2024-08-07",
        CheckOut: "2024-09-06",
        NumberOfNight: 30,
        Cost: 0,
        ExpenseDate: "2024-09-06",
        Notes: "Amazing",
      };

      const recordToUpdate = [
        {
          id: "rec1",
          fields: updatedAccommodation,
        },
      ];

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/accommodations/rec45qGQC3Ips3iBN")
        .send(updatedAccommodation);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Accommodation updated successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update accommodation")
      );

      const updatedAccommodation = {
        TripRecordID: ["trip5", "trip2"],
        EventID: "event1",
        BookingReference: 123,
        HotelName: "California",
        Address: "Los Santos",
        Room: 666,
        CheckIn: "2024-08-07",
        CheckOut: "2024-09-06",
        NumberOfNight: 30,
        Cost: 0,
        ExpenseDate: "2024-09-06",
        Notes: "Amazing",
      };

      const response = await request(app)
        .put("/accommodations/rec45qGQC3Ips3iBN")
        .send(updatedAccommodation);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update accommodation");
    });
  });

  describe("DELETE /accommodations/:accommodation_record_id", () => {
    it("should delete an existing accommodation", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/accommodations/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Accommodation deleted successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete accommodation")
      );

      const response = await request(app).delete("/accommodations/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete accommodation");
    });
  });
});
