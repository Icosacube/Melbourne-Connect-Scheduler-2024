import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { FormInputText } from '../../../../components/FormComponents/FormInputText'
import { FormInputDate } from '../../../../components/FormComponents/FormInputDate'
import BottomSuccessSnackbar from '../../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { AxiosResponse } from 'axios'
import { Catering } from '../../../../types/frontendTypes'
import { FormInputMultiSelect } from '../../../../components/FormComponents/FormInputDropdown'
import { createCatering } from '../../../../scripts/catering/functions'
import { FormInputNumber } from '../../../../components/FormComponents/FormInputNumber'

interface CreateCateringModalProps {
    handleClose: () => void
    open: boolean
    eventID: string
    fundingAccounts: Map<string, string>
    addCatering: (catering: Catering) => void
}

const CreateCateringFormDefaultValues: Catering = {
    RecordID: '',
    BookingReference: '',
    Description: '',
    Cost: 0,
    ExpenseDate: dayjs(),
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

export const CreateCateringModal: React.FC<CreateCateringModalProps> = ({
    handleClose,
    open,
    eventID,
    fundingAccounts,
    addCatering,
}) => {
    const { handleSubmit, reset, control, setValue } = useForm<Catering>({
        defaultValues: CreateCateringFormDefaultValues,
    })

    const onSubmit = async (data: Catering) => {
        try {
            const res: AxiosResponse = await createCatering(data, eventID)
            setShowSuccess(true)
            addCatering(data)
        } catch (error) {
            console.error(error)
        } finally {
            reset()
            handleClose()
            console.log(data)
        }
    }

    const onClose = () => {
        handleClose()
        reset()
    }

    const [showSuccess, setShowSuccess] = useState(false)

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
                    <Box className="flex space-x-10 mb-4">
                        <Box className="space-y-4">
                            <FormInputText
                                name="BookingReference"
                                control={control}
                                label="Booking Reference"
                            />
                            <FormInputText
                                name="Description"
                                control={control}
                                label="Description"
                            />
                            <FormInputNumber
                                name="Cost"
                                control={control}
                                label="Cost"
                            />
                        </Box>
                        <Box className="space-y-4">
                            <FormInputMultiSelect
                                name="FundingAccount"
                                control={control}
                                label="Funding Account"
                                // Display themis strings for funding account options
                                options={Array.from(
                                    fundingAccounts.entries()
                                ).map(([id, themisString]) => ({
                                    label: themisString,
                                    value: id,
                                }))}
                            />
                            <FormInputDate
                                name="ExpenseDate"
                                control={control}
                                label="Expense Date"
                            />
                        </Box>
                    </Box>
                    <Box className="space-x-4">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant={'contained'}
                        >
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
                message="Catering created successfully"
            />
        </>
    )
}
