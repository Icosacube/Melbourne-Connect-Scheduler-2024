import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
// import { FormInputDate } from '../../../components/FormComponents/FormInputDate';
// import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown';
// import { FormInputText } from '../../../components/FormComponents/FormInputText';
import dayjs, { Dayjs } from 'dayjs';
import {FormInputText} from "../../../../components/FormComponents/FormInputText";
import {FormInputDate} from "../../../../components/FormComponents/FormInputDate";
import BottomSuccessSnackbar from "../../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar";
import {AxiosResponse} from "axios";
import {MainEvent, SubEvent} from "../../../../types/frontendTypes";
import {createSubEvent} from "../../../../scripts/subevent/function";

interface CreateSubEventModalProps {
    handleClose: () => void;
    open: boolean;
    event: MainEvent,
}

// interface CreateSubEventFormInput {
//     eventName: string;
//     eventDescription: string;
//     eventType: string;
//     date: Dayjs;
//     notes: string;
//     mainEvent: string;
// }

const CreateSubEventFormDefaultValues : SubEvent = {
    RecordID: '',
    EventName: '',
    EventDescription: '',
    EventType: '',
    Date: dayjs(),
    Notes: '',
    MainEvent: [],
    Completed: false,
    Speakers: [],
};

export const CreateSubEventModal: React.FC<CreateSubEventModalProps> = ({ handleClose, open, event }) => {
    const { handleSubmit, reset, control, setValue } =
        useForm<SubEvent>({
            defaultValues: CreateSubEventFormDefaultValues,
        });

    const onSubmit = async (data: SubEvent) => {
        try {
            const res: AxiosResponse = await createSubEvent(data, event.RecordID);
            if (res.status == 200) {
                setShowSuccess(true);
            } else {
                console.log('Failed to create sub-event');
            }
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
                            <FormInputDate name='Date' control={control} label='Date' />
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