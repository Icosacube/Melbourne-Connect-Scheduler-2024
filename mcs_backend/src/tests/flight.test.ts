import request from "supertest";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";

const flightRouter = require("../controller/flight"); 
const app = express();
app.use(express.json());
app.use("/", flightRouter);

jest.mock("../models/airtable", () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

describe("Flights Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("GET /flights", () => {
    it("should return all flights", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            Airline: "Airline 1",
            FlightNumber: "FL123",
            DepartureFrom: "JFK",
            ArrivedTo: "LAX",
            Cost: 2000,
            FundingAccount: "Account1",
            DepartDate: "20/08/24",
            ArriveDate: "21/08/24",
            ReturnFlight: "30/08/24",
            Trip: ["trip1"],
          },
        },
        {
          id: "rec2",
          fields: {
            Airline: "Airline 2",
            FlightNumber: "MK123",
            DepartureFrom: "MIA",
            ArrivedTo: "LAX",
            Cost: 3000,
            FundingAccount: "Account2",
            DepartDate: "20/09/24",
            ArriveDate: "21/09/24",
            ReturnFlight: "30/09/24",
            Trip: ["trip2"],
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/flights");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          Airline: "Airline 1",
          FlightNumber: "FL123",
          DepartureFrom: "JFK",
          ArrivedTo: "LAX",
          Cost: 2000,
          FundingAccount: "Account1",
          DepartDate: "20/08/24",
          ArriveDate: "21/08/24",
          ReturnFlight: "30/08/24",
          Trip: ["trip1"],
          id: "rec1",
        },
        {
          Airline: "Airline 2",
          FlightNumber: "MK123",
          DepartureFrom: "MIA",
          ArrivedTo: "LAX",
          Cost: 3000,
          FundingAccount: "Account2",
          DepartDate: "20/09/24",
          ArriveDate: "21/09/24",
          ReturnFlight: "30/09/24",
          Trip: ["trip2"],
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

      const response = await request(app).get("/flights");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("GET /flights/:flight_record_id", () => {
    it("should return a specific flight by ID", async () => {
      const mockRecord = {
        id: "rec1",
        fields: {
          Airline: "Airline 1",
          FlightNumber: "FL123",
          DepartureFrom: "JFK",
          ArrivedTo: "LAX",
          Cost: 2000,
          FundingAccount: "Account1",
          DepartDate: "20/08/24",
          ArriveDate: "21/08/24",
          ReturnFlight: "30/08/24",
          Trip: ["trip1"],
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(
          Object.entries(mockRecord.fields).concat([["id", mockRecord.id]])
        )
      );

      const response = await request(app).get("/flights/rec1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        Airline: "Airline 1",
        FlightNumber: "FL123",
        DepartureFrom: "JFK",
        ArrivedTo: "LAX",
        Cost: 2000,
        FundingAccount: "Account1",
        DepartDate: "20/08/24",
        ArriveDate: "21/08/24",
        ReturnFlight: "30/08/24",
        Trip: ["trip1"],
        id: "rec1",
      });
    });

    it("should return 404 if the flight is not found", async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/flights/nonexistent");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Flight not found");
    });

    it("should return 500 if there is a server error", async () => {
      (getRecord as jest.Mock).mockRejectedValue(
        new Error("Internal Server Error")
      );

      const response = await request(app).get("/flights/rec1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("GET /flights/trips/:tripID", () => {
    it("should return all flights for a specific trip", async () => {
      const mockData = [
        {
          id: "rec1",
          fields: {
            Airline: "Airline 1",
            FlightNumber: "FL123",
            DepartureFrom: "JFK",
            ArrivedTo: "LAX",
            Cost: 2000,
            FundingAccount: "Account1",
            DepartDate: "20/08/24",
            ArriveDate: "21/08/24",
            ReturnFlight: "30/08/24",
            Trip: ["trip1"],
          },
        },
        {
          id: "rec2",
          fields: {
            Airline: "Airline 2",
            FlightNumber: "MK123",
            DepartureFrom: "MIA",
            ArrivedTo: "LAX",
            Cost: 3000,
            FundingAccount: "Account2",
            DepartDate: "20/09/24",
            ArriveDate: "21/09/24",
            ReturnFlight: "30/09/24",
            Trip: ["trip2"],
          },
        },
        {
          id: "rec3",
          fields: {
            Airline: "Airline 3",
            FlightNumber: "EK733",
            DepartureFrom: "LAS",
            ArrivedTo: "LAX",
            Cost: 3000,
            FundingAccount: "Account3",
            DepartDate: "20/09/24",
            ArriveDate: "21/09/24",
            ReturnFlight: "30/09/24",
            Trip: ["trip1"],
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map(
          (item) =>
            new Map(Object.entries(item.fields).concat([["id", item.id]]))
        )
      );

      const response = await request(app).get("/flights/trips/trip1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          Airline: "Airline 1",
          FlightNumber: "FL123",
          DepartureFrom: "JFK",
          ArrivedTo: "LAX",
          Cost: 2000,
          FundingAccount: "Account1",
          DepartDate: "20/08/24",
          ArriveDate: "21/08/24",
          ReturnFlight: "30/08/24",
          Trip: ["trip1"],
          id: "rec1",
        },
        {
          Airline: "Airline 3",
          FlightNumber: "EK733",
          DepartureFrom: "LAS",
          ArrivedTo: "LAX",
          Cost: 3000,
          FundingAccount: "Account3",
          DepartDate: "20/09/24",
          ArriveDate: "21/09/24",
          ReturnFlight: "30/09/24",
          Trip: ["trip1"],
          id: "rec3",
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

      const response = await request(app).get("/flights/trip1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal Server Error");
    });
  });

  describe("POST /flights", () => {
    it("should create a new flight", async () => {
      const newFlight = {
        Airline: "Airline 5",
        FlightNumber: "AA123",
        DepartureFrom: "LAX",
        ArrivedTo: "LAS",
        Cost: 2000,
        FundingAccount: "Account3",
        DepartDate: "20/09/24",
        ArriveDate: "21/09/24",
        ReturnFlight: "30/08/24",
        Trip: ["trip1"],
      };

      (createRecord as jest.Mock).mockResolvedValue(["recNew"]);

      const response = await request(app).post("/flights").send(newFlight);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("flight created successfully");
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newFlight },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      const newFlight = {
        Airline: "Airline 5",
        FlightNumber: "AA123",
        DepartureFrom: "LAX",
        ArrivedTo: "LAS",
        Cost: 2000,
        FundingAccount: "Account3",
        DepartDate: "20/09/24",
        ArriveDate: "21/09/24",
        ReturnFlight: "30/08/24",
        Trip: ["trip1"],
      };

      (createRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to create flight")
      );

      const response = await request(app).post("/flights").send(newFlight);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create flight");
    });
  });

  describe("PUT /flights/:flight_record_id", () => {
    it("should update an existing flight", async () => {
      const updatedFlight = {
        Airline: "Airline 5",
        FlightNumber: "AA123",
        DepartureFrom: "LAX",
        ArrivedTo: "LAS",
        Cost: 2000,
        FundingAccount: "Account3",
        DepartDate: "20/09/24",
        ArriveDate: "21/09/24",
        ReturnFlight: "30/08/24",
        Trip: ["trip1"],
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put("/flights/rec1")
        .send(updatedFlight);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Flight updated successfully");
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: "rec1", fields: updatedFlight },
      ]);
    });

    it("should return 500 if there is a server error", async () => {
      const updatedFlight = {
        Airline: "Updated Airline",
        FlightNumber: "FL999",
        DepartureFrom: "JFK",
        ArrivedTo: "LAX",
        Trip: ["tripUpdated"],
      };

      (updateRecord as jest.Mock).mockRejectedValue(
        new Error("Failed to update flight")
      );

      const response = await request(app)
        .put("/flights/rec1")
        .send(updatedFlight);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update flight");
    });
  });

  describe("DELETE /flights/:flight_record_id", () => {
    it("should delete an existing flight", async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete("/flights/rec1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Flight deleted successfully");
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ["rec1"]);
    });

    it("should return 500 if there is a server error", async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(
        new Error("Failed to delete flight")
      );

      const response = await request(app).delete("/flights/rec1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete flight");
    });
  });
});
