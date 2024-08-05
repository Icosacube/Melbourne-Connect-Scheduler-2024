import { Box, Grid, Typography } from "@mui/material";
import React, { useState, FC } from "react";
import { Accommodation, Flight } from "../../types/frontendTypes";
import dayjs from "dayjs";
import CreateCard from "./CreateCard";
import { CreateFlightModal } from "./Flight/CreateFlightModal";
import { CreateAccommodationModal } from "./Accomodation/CreateAccommodationModal";
import Accomodation from "./Accomodation/Accomodation";
import Costs from "./TabPages/Costs";
import TravelView from "./Flight/TravelView";

export const TripsTab: FC = () => {
  // Placeholder
  const emptyFlights: Flight[] = [];
  const exampleFlights: Flight[] = [
    {
      RecordID: '1',
      FlightReference: 'ABC123',
      Airline: 'Qantas',
      FlightNumber: 'EA1234',
      DepartureFrom: 'City A',
      ArrivedTo: 'City B',
      DepartDate: dayjs('2024-08-01T10:00:00'),
      ArriveDate: dayjs('2024-08-01T12:00:00'),
      Cost: 500,
      Trip: ['001', '002'],
      FundingAccount: ['a12', 'b34'],
      ReturnFlight: ['c341', 'd4576'],
    },
    {
      RecordID: '2',
      FlightReference: 'DEF456',
      Airline: 'Emirates',
      FlightNumber: 'EA5678',
      DepartureFrom: 'City C',
      ArrivedTo: 'City D',
      DepartDate: dayjs('2024-08-02T14:00:00'),
      ArriveDate: dayjs('2024-08-02T18:00:00'),
      Cost: 700,
      Trip: ['003', '004'],
      FundingAccount: ['c56', 'd78'],
      ReturnFlight: ['e567', 'f890'],
    },
  ];

  const [flights, setFlights] = useState<Flight[]>(emptyFlights);
  const [accom, setAccom] = useState<Accommodation[]>([]);
  const [openFlight, setOpenFlight] = useState(false);
  const [openAccom, setOpenAccom] = useState(false);

  const handleOpenFlight = () => {
    setOpenFlight(true);
  };
  
  const handleCloseFlight = () => {
    setOpenFlight(false);
  };

  const handleOpenAccom = () => {
    setOpenAccom(true);
  };
  
  const handleCloseAccom = () => {
    setOpenAccom(false);
  };

  return (
    <Box className="w-full">
      <Grid container className="flex justify-between items-stretch" spacing={2}>
        <Grid item xs={12}>
          <Typography>Flight Tickets</Typography>
        </Grid>
        
        {flights.length > 0 && flights.map((flight, index) => (
          <Grid item md={12} lg={6} key={index}>
            <TravelView flight={flight} />
          </Grid>
        ))}
        
        {flights.length <= 1 && (
          <Grid item md={12} lg={6}>
            <CreateCard onClick={handleOpenFlight} name={"Flight"} />
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Typography>Accommodation</Typography>
        </Grid>
        
        {accom.length > 0 && accom.map((accommodation, index) => (
          <Grid item md={12} key={index}>
          
          </Grid>
        ))}
        
        {accom.length <= 1 && (
          <Grid item md={12}>
            <CreateCard onClick={handleOpenAccom} name={"Accommodation"} />
          </Grid>
        )}
        
        <Grid item md={12}>
          <Costs />
        </Grid>
      </Grid>

      <CreateFlightModal handleClose={handleCloseFlight} open={openFlight} />
      <CreateAccommodationModal handleClose={handleCloseAccom} open={openAccom} />
    </Box>
  );
};

export default TripsTab;
