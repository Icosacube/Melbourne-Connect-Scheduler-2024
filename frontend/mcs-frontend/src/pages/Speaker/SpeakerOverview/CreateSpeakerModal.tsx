<<<<<<< HEAD:frontend/mcs-frontend/src/pages/Speaker/SpeakerOverview/CreateSpeakerModal.tsx
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BottomSuccessSnackbar from "../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar";
import { FormInputText } from "../../../components/FormComponents/FormInputText";
import { Speaker } from "../../../types/frontendTypes";
import { createSpeaker } from "../../../scripts/speaker/functions";
import { AxiosResponse } from "axios";
=======
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSuccessSnackbar from '../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
import { FormInputMultiSelect } from '../../components/FormComponents/FormInputDropdown';
import { FormInputText } from '../../components/FormComponents/FormInputText';
import { Speaker } from '../../types/frontendTypes';
import { createSpeaker } from '../../scripts/speaker/functions';
import { AxiosResponse } from 'axios';
>>>>>>> origin/main:frontend/mcs-frontend/src/pages/Speaker/CreateSpeakerModal.tsx

interface CreateSpeakerModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreateSpeakerFormDefaultValues: Speaker = {
  RecordID: "",
  PrimaryEmail: "",
  FirstName: "",
  LastName: "",
  Pronouns: "",
  Title: "",
  AlternativeTitle: "",
  Phone: "",
  Bio: "",
  Headshot: "",
  PreferredTimezone: "",
  Category: "",
  Area: "",
  WorkTitle: "",
  Organisation: "",
  Department: "",
  Address: "",
  CitySuburb: "",
  State: "",
  Country: "",
  Postcode: "",
  EmergencyContactName: "",
  EmergencyContactRelationship: "",
  EmergencyContactNumber: "",
  FlyerMembershipName: "",
  FlyerMembershipNumber: "",
  Confirmed: false,
  Trip: [],
  MainEvent: [],
  SubEvent: [],
};

const trips = [
  {
    label: "Trip 1",
    value: "1",
  },
  {
    label: "Trip 2",
    value: "2",
  },
];

const mainEvents = [
  {
    label: "Main Event 1",
    value: "1",
  },
  {
    label: "Main Event 2",
    value: "2",
  },
];

const subEvents = [
  {
    label: "Sub Event 1",
    value: "1",
  },
  {
    label: "Sub Event 2",
    value: "2",
  },
];

export const CreateSpeakerModal: React.FC<CreateSpeakerModalProps> = ({
  handleClose,
  open,
}) => {
  const { handleSubmit, reset, control, setValue } = useForm<Speaker>({
    defaultValues: CreateSpeakerFormDefaultValues,
  });

  const onSubmit = async (data: Speaker) => {
    try {
      const res: AxiosResponse = await createSpeaker(data);
      if (res.status == 200) {
        setShowSuccess(true);
      } else {
        console.log("Failed to create speaker");
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
          <Typography variant="h5" className="mb-4">
            Create Event
          </Typography>
          {/* Left */}
          <Box className="flex space-x-10 mb-4">
            <Box className="space-y-4">
              <Typography variant="h6">About</Typography>
              <FormInputText name="Title" control={control} label="Title" />
              <FormInputText
                name="AlternativeTitle"
                control={control}
                label="Alternative Title"
              />
              <FormInputText
                name="Pronouns"
                control={control}
                label="Pronouns"
              />
              <FormInputText
                name="FirstName"
                control={control}
                label="First Name"
              />
              <FormInputText
                name="LastName"
                control={control}
                label="Last Name"
              />
              <FormInputText name="Bio" control={control} label="Bio" />
              <FormInputText
                name="Headshot"
                control={control}
                label="Headshot"
              />
            </Box>
            {/* Right */}
            <Box className="space-y-4">
              <Typography variant="h6">Address & Contact</Typography>
              <FormInputText
                name="PrimaryEmail"
                control={control}
                label="Primary Email"
              />
              <FormInputText name="Phone" control={control} label="Phone" />
              <FormInputText name="Address" control={control} label="Address" />
              <FormInputText
                name="CitySuburb"
                control={control}
                label="CitySuburb"
              />
              <FormInputText name="State" control={control} label="State" />
              <FormInputText name="Country" control={control} label="Country" />
              <FormInputText
                name="Postcode"
                control={control}
                label="Postcode"
              />
              <FormInputText
                name="PreferredTimezone"
                control={control}
                label="Preferred Timezone"
              />
            </Box>
            <Box className="space-y-4">
              <Typography variant="h6">Work</Typography>
              <FormInputText name="Area" control={control} label="Area" />
              <FormInputText
                name="Category"
                control={control}
                label="Category"
              />
              <FormInputText
                name="WorkTitle"
                control={control}
                label="WorkTitle"
              />
              <FormInputText
                name="Organisation"
                control={control}
                label="Organisation"
              />
              <FormInputText
                name="Department"
                control={control}
                label="Department"
              />
            </Box>
            <Box className="space-y-4">
              <Typography variant="h6">Misc</Typography>
              <FormInputText
                name="EmergencyContactName"
                control={control}
                label="Emergency Contact Name"
              />
              <FormInputText
                name="EmergencyContactRelationship"
                control={control}
                label="Emergency Contact Relationship"
              />
              <FormInputText
                name="EmergencyContactNumber"
                control={control}
                label="Emergency Contact Number"
              />
              <FormInputText
                name="FlyerMembershipName"
                control={control}
                label="Flyer Membership Name"
              />
              <FormInputText
                name="FlyerMembershipNumber"
                control={control}
                label="Flyer Membership Number"
              />
              <FormInputText
                name="Confirmed"
                control={control}
                label="Confirmed"
              />
              <FormInputMultiSelect
                name='Trip'
                control={control}
                label='Trip'
                options={trips}
              />
              <FormInputMultiSelect
                name='MainEvent'
                control={control}
                label='Main Event'
                options={mainEvents}
              />
              <FormInputMultiSelect
                name='SubEvent'
                control={control}
                label='Sub Event'
                options={subEvents}
              />
            </Box>
          </Box>
          <Box className="space-x-4">
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
              Submit
            </Button>
            <Button onClick={() => reset()} variant={"outlined"}>
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for success message after event creation */}
      <BottomSuccessSnackbar
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        message="Speaker created successfully"
      />
    </>
  );
};
