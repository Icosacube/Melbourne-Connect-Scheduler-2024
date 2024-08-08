import { Box, Divider, Stack, Typography } from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import Headline from "./Headline";
import WeeklyCalendar from "../../../../components/Calendar/WeeklyCalendar";
import { MainEvent, SubEvent } from "../../../../types/frontendTypes";
import {getAllSubEventsByEventID} from "../../../../scripts/subevent/function";

interface ProgrammeProps {
    event: MainEvent,
}

export const Programme : FC<ProgrammeProps> = ({ event}) => {

    const [subevents, setSubevents] = useState<SubEvent[]>([]);

    useEffect(() => {
        const fetchSubevents = async () => {
            try {
                const fetchedSubevents = await getAllSubEventsByEventID(event.RecordID);
                setSubevents(fetchedSubevents);
            } catch (error) {
                console.error("Error fetching subevents:", error);
            }
        };

        fetchSubevents();
    }, [event.RecordID]);

    return (
    <Box className="space-y-5">
      <Headline />
      <WeeklyCalendar event={event} subevents={subevents} />
    </Box>
  );
}

export default Programme;
