import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Accommodation, Flight } from "../../types/frontendTypes";
import CreateCard from "./CreateCard";
import { CreateFlightModal } from "./Flight/CreateFlightModal";
import { CreateAccomModal } from "./Accomodation/CreateAccomModal";
import AccomCard from "./Accomodation/AccomCard";
import Costs from "./TabPages/Costs";
import FlightCard from "./Flight/FlightCard";
import { getFlightsByTripID } from "../../scripts/flight/function";
import { getAccomByTripID } from "../../scripts/accommodation/function";

interface TripBodyProps {
  tripID: string
}

export const TripBody: React.FC<TripBodyProps> = ({
  tripID
}) => {

  const [flights, setFlights] = useState<Flight[]>([]);
  const [accom, setAccom] = useState<Accommodation[]>([]);
  const [openFlight, setOpenFlight] = useState(false);
  const [openAccom, setOpenAccom] = useState(false);

  useEffect(() => {
    getFlightsByTripID(tripID)
      .then((flights) => {
        setFlights(flights);
      })
      .catch((error) => {
        console.error('Error fetching flights:', error);
      });
  
    getAccomByTripID(tripID)
      .then((accommodations) => {
        setAccom(accommodations);
      })
      .catch((error) => {
        console.error('Error fetching accommodations:', error);
      });
  }, [tripID]);

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
            <FlightCard flight={flight} />
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
        
        {accom.length > 0 && accom.map((accom, index) => (
          <Grid item md={12} key={index}>
            <AccomCard accom={accom}></AccomCard>
          </Grid>
        ))}
        
        {accom.length == 0 && (
          <Grid item md={12}>
            <CreateCard onClick={handleOpenAccom} name={"Accommodation"} />
          </Grid>
        )}
        
        <Grid item md={12}>
          <Costs />
        </Grid>
      </Grid>

      <CreateFlightModal handleClose={handleCloseFlight} open={openFlight} tripID={tripID} />
      <CreateAccomModal handleClose={handleCloseAccom} open={openAccom} tripID={tripID}/>
    </Box>
  );
};

export default TripBody;
