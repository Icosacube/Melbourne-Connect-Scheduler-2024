import {Box, Button, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import WeeklyCalendar from "../../../../components/Calendar/WeeklyCalendar";
import {MainEvent, SubEvent, Speaker} from "../../../../types/frontendTypes";
import {getSubEventsByEventID} from "../../../../scripts/subevent/functions";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import {CreateSubEventModal} from "./CreateSubEventModal";

interface ProgrammeProps {
    event: MainEvent,
    speakers: Speaker[]
}

export const Programme: FC<ProgrammeProps> = ({event, speakers}) => {

    const [subEvents, setSubEvents] = useState<SubEvent[]>([]);
    const [openCreate, setOpenCreate] = useState(false);

    // Fetch subevents
    const fetchSubEvents = async () => {
        const fetchedSubEvents = await getSubEventsByEventID(event.RecordID);
        setSubEvents(fetchedSubEvents);
    }

    // Fetch subevents when eventID changes
    useEffect(() => {
        fetchSubEvents();
    }, [event.RecordID]);

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);

    const handleSubEventCreated = () => {
        fetchSubEvents();
    };

    return (
        <>
            <Box className="mb-4 flex flex-col">
                <Button
                    variant="contained"
                    className="flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12"
                    onClick={handleOpenCreate}
                >
                    <AddCircleOutlineOutlined />
                    <Typography>Create Sub-Event</Typography>
                </Button>
                <CreateSubEventModal
                    open={openCreate}
                    handleClose={handleCloseCreate}
                    event={event}
                    speakers={speakers}
                    onSubEventCreation={handleSubEventCreated} />
            </Box>
            <Box className="space-y-5">
                <WeeklyCalendar
                    event={event}
                    subEvents={subEvents}
                />
            </Box>
        </>
    );
};
export default Programme;
