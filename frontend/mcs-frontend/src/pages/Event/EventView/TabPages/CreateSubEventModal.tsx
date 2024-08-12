import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import {FormInputText} from "../../../../components/FormComponents/FormInputText";
import BottomSuccessSnackbar from "../../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar";
import {AxiosResponse} from "axios";
import {MainEvent, SubEvent, Speaker} from "../../../../types/frontendTypes";
import {createSubEvent} from "../../../../scripts/subevent/functions";
import {FormInputMultiSelect} from "../../../../components/FormComponents/FormInputDropdown";
import {FormInputDateTime} from "../../../../components/FormComponents/FormInputDateTime";

interface CreateSubEventModalProps {
    handleClose: () => void;
    open: boolean;
    event: MainEvent;
    speakers: Speaker[];
    onSubEventCreation: () => void;
}

const CreateSubEventFormDefaultValues : SubEvent = {
    RecordID: '',
    EventName: '',
    EventDescription: '',
    EventType: '',
    StartDate: dayjs(),
    Notes: '',
    MainEvent: [],
    Completed: false,
    Speakers: [],
    EndDate: dayjs(),
};

export const CreateSubEventModal: React.FC<CreateSubEventModalProps> = ({
                                                                            handleClose,
                                                                            open,
                                                                            event,
                                                                            speakers ,
                                                                            onSubEventCreation}) => {
    const { handleSubmit, reset, control, setValue } =
        useForm<SubEvent>({
            defaultValues: CreateSubEventFormDefaultValues,
        });

    const onSubmit = async (data: SubEvent) => {
        try {
            const res: AxiosResponse = await createSubEvent(data, event.RecordID);
            setShowSuccess(true);
            onSubEventCreation();
        } catch (error) {
            console.error(error);
        } finally {
            reset();
            handleClose();
            console.log(data);
        }
    };

    const onClose = () => {
        handleClose();
        reset();
    };

    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12'>
                    <Typography variant='h5' className='mb-4'>
                        Create Sub-Event
                    </Typography>
                    {/* Left */}
                    <Box className='flex space-x-10 mb-4'>
                        <Box className='space-y-4'>
                            <FormInputText
                                name='EventName'
                                control={control}
                                label='Event Name'
                            />
                            <FormInputText
                                name='EventDescription'
                                control={control}
                                label='Event Description'
                            />
                            <FormInputText
                                name='EventType'
                                control={control}
                                label='Event Type'
                            />
                        </Box>
                        {/* Right */}
                        <Box className='space-y-4'>
                            <FormInputText
                                name='Notes'
                                control={control}
                                label='Notes'
                            />
                            <FormInputMultiSelect
                                name='Speakers'
                                control={control}
                                label='Speakers'
                                options={speakers.map((speaker) => ({
                                    label: `${speaker.FirstName} ${speaker.LastName}`,
                                    value: speaker.RecordID,
                                }))}
                            />
                            <Box className="flex space-x-4">
                                <FormInputDateTime name='StartDate' control={control} label='Start' />
                                <FormInputDateTime name='EndDate' control={control} label='End' />
                            </Box>
                        </Box>
                    </Box>
                    <Box className='space-x-4'>
                        <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
                            Submit
                        </Button>
                        <Button onClick={() => reset()} variant={'outlined'}>
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar for success message after event creation */}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message='Sub-event created successfully'
            />
        </>
    );
};