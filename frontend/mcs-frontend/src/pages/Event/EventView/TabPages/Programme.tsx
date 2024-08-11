import {Box, Button, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import WeeklyCalendar from "../../../../components/Calendar/WeeklyCalendar";
import { MainEvent, SubEvent, Speaker } from "../../../../types/frontendTypes";
import {getSubEventsByEventID} from "../../../../scripts/subevent/function";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import {CreateSubEventModal} from "./CreateSubEventModal";

interface ProgrammeProps {
    event: MainEvent,
    speakers: Speaker[]
}

export const Programme : FC<ProgrammeProps> = ({ event, speakers}) => {

    const [subEvents, setSubEvents] = useState<SubEvent[]>([]);

    console.log(speakers);

    useEffect(() => {
        const fetchSubEvents = async () => {
            try {
                const fetchedSubEvents = await getSubEventsByEventID(event.RecordID);
                setSubEvents(fetchedSubEvents);
            } catch (error) {
                console.error("Error fetching subevents:", error);
            }
        };

        fetchSubEvents();
    }, [event.RecordID]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Box className='  mb-4 flex flex-col'>
                <Box className=' flex flex-col'>
                <Button
                    variant='contained'
                    className=' flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12'
                    onClick={handleOpen}
                >
                    <AddCircleOutlineOutlined />
                    <Typography>Create Sub-Event</Typography>
                </Button>

                <CreateSubEventModal open={open} handleClose={handleClose} event={event} speakers={speakers} />
                </Box>
            </Box>
            <Box className="space-y-5">
                {/*<Headline />*/}
                <WeeklyCalendar event={event} subEvents={subEvents} />
            </Box>
        </>
    );

}

export default Programme;
