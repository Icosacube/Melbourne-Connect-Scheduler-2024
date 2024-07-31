import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BottomSuccessSnackbar from "../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar";
import { FormInputDate } from "../../../components/FormComponents/FormInputDate";
import { FormInputMultiSelect } from "../../../components/FormComponents/FormInputDropdown";
import { FormInputText } from "../../../components/FormComponents/FormInputText";
import dayjs, { Dayjs } from "dayjs";

interface CreateEventModalProps {
  handleClose: () => void;
  open: boolean;
}

interface CreateEventFormInput {
  speaker: string[];
  venue: string[];
  date: Dayjs;
  eventDescription: string;
  eventName: string;
  eventAbstract: string;
}

const CreateEventFormDefaultValues = {
  speaker: [],
  venue: [],
  date: dayjs(),
  eventDescription: "",
  eventName: "",
  eventAbstract: "",
};

const speakers = [
  {
    label: "Speaker 1",
    value: "1",
  },
  {
    label: "Speaker 2",
    value: "2",
  },
];

const venue = [
  {
    label: "Venue 1",
    value: "1",
  },
  {
    label: "Venue 2",
    value: "2",
  },
];

export const CreateEventModal: React.FC<CreateEventModalProps> = (
  handleClose,
  open
) => {
  const { handleSubmit, reset, control, setValue } =
    useForm<CreateEventFormInput>({
      defaultValues: CreateEventFormDefaultValues,
    });

  const onSubmit = (data: CreateEventFormInput) => console.log(data);
  const onClose = () => {
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
          <Typography className="heading">Create Event</Typography>
          <Box className="space-y-4 flex space-x-10">
            <Box className="space-y-4">
              <FormInputText
                name="eventName"
                control={control}
                label="Event Name"
              />
              <FormInputMultiSelect
                name="venue"
                control={control}
                label="Venue"
                options={venue}
              />
              <FormInputMultiSelect
                name="speaker"
                control={control}
                label="Speaker"
                options={speakers}
              />
            </Box>
            <Box>
              <FormInputText
                name="eventDescription"
                control={control}
                label="Event Description"
              />

              <FormInputText
                name="eventAbstract"
                control={control}
                label="Event Abstract"
              />
              <FormInputDate name="date" control={control} label="Date" />
            </Box>
          </Box>
          <Box>
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
        message="Event created successfully"
      />
    </>
  );
};

// These are here because there were some import errors
// export const CreateEventModal: React.FC<CreateEventModalProps> = ({
//   handleClose,
//   open,
// }) => {
//   const [newEvent, setNewEvent] = useState<MainEvent>({});
//   const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
//   const [showSuccess, setShowSuccess] = useState(false);
//   // TODO load in speakers
//   const speakers: Speaker[] = [];

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewEvent({ ...newEvent, [name]: value });
//   };

//   const handleSpeakerChange = (event: SelectChangeEvent<string[]>) => {
//     const selectedSpeakerIds = event.target.value as string[];
//     setNewEvent({ ...newEvent, Speaker: selectedSpeakerIds });
//   };

//   const handleDate = (e: any) => {
//     // datepicker already has it
//     setNewEvent({ ...newEvent, Date: e });
//   };

//   const onClose = () => {
//     // reset useState variables
//     // setNewEvent({
//     //   venue: [],
//     //   speakers: [],
//     // });
//     setSelectedSpeakers([]);
//     // close modal
//     handleClose();
//   };
//   const handleSave = async () => {
//     setShowSuccess(false);
//     handleClose();
//     console.log(newEvent);
//     // TODO change to actual speaker id
//     var res = await createEvent(newEvent, "");
//     if (res) {
//       // handle success
//       // reset useState variables
//       // setNewEvent({
//       //   Venue: [],
//       //   Speaker: [],
//       // });
//       setSelectedSpeakers([]);

//       // display success message
//       setTimeout(() => {
//         setShowSuccess(true);
//         setTimeout(() => {
//           setShowSuccess(false);
//         }, 2000);
//       }, 0);
//     } else {
//       // handle failure
//     }
//   };

//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={onClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//       </Modal>
//         {/* <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
//           <Box className="w-full p-7 flex space-x-6">
//             <Box className="w-1/2 space-y-4">
//               <Box className="flex justify-between space-x-2">
//                 <Stack className="w-1/2">
//                   <Typography variant="h6">Speakers</Typography>
//                   <Box className="bg-gray-100 p-4 rounded-xl ">
//                     <Select
//                       fullWidth
//                       value={selectedSpeakers}
//                       onChange={handleSpeakerChange}
//                       name="speakers"
//                       multiple
//                     >
//                       {speakers.map((speaker) => (
//                         <MenuItem
//                           value={speaker.RecordID}
//                           key={speaker.RecordID}
//                         >
//                           {speaker.FirstName} {speaker.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </Box>
//                 </Stack>
//                 <Stack className="w-1/2">
//                   <Typography variant="h6">Date</Typography>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       className="bg-gray-100 p-4 rounded-xl "
//                       // variant="outlined"
//                       defaultValue={newEvent.Date}
//                       value={newEvent.Date}
//                       name="date"
//                       onChange={handleDate}
//                       // adapterLocale="en-au"
//                     />
//                   </LocalizationProvider>
//                 </Stack>
//               </Box>
//               <Stack>
//                 <Typography variant="h6">Venue</Typography>
//                 <TextField
//                   className="bg-gray-100 p-4 rounded-xl "
//                   variant="outlined"
//                   name="venue"
//                   defaultValue={newEvent.Venue}
//                   value={newEvent.Venue}
//                   onChange={handleInputChange}
//                 />
//               </Stack>
//               <Stack>
//                 <Typography variant="h6">Event Description</Typography>
//                 <TextField
//                   className="bg-gray-100 p-4 rounded-xl "
//                   variant="outlined"
//                   name="eventDescription"
//                   defaultValue={newEvent.EventDescription}
//                   onChange={handleInputChange}
//                   value={newEvent.EventDescription}
//                   multiline
//                 />
//               </Stack>
//             </Box>
//             <Box className="w-1/2 space-y-4">
//               <Stack>
//                 <Typography variant="h6">Event Name</Typography>
//                 <TextField
//                   className="bg-gray-100 p-4 rounded-xl "
//                   variant="outlined"
//                   defaultValue={newEvent.EventName}
//                   value={newEvent.EventName}
//                   onChange={handleInputChange}
//                   name="name"
//                 />
//               </Stack>
//               <Stack>
//                 <Typography variant="h6">Event Abstract</Typography>
//                 <TextField
//                   className="bg-gray-100 p-4 rounded-xl "
//                   variant="outlined"
//                   defaultValue={newEvent.EventAbstract}
//                   multiline
//                   value={newEvent.EventAbstract}
//                   onChange={handleInputChange}
//                   name="talkAbstract"
//                 />
//               </Stack>
//             </Box>
//           </Box>
//           <Button
//             variant="contained"
//             onClick={handleSave}
//             className="bg-primary text-white hover:bg-tertiary "
//           >
//             Save
//           </Button>
//         </Box> */}
//       </Modal>

//       {/* Snackbar for success message after event creation */}
//       <BottomSuccessSnackbar
//         showSuccess={showSuccess}
//         setShowSuccess={setShowSuccess}
//         message="Event created successfully"
//       />
//     </>
//   );
// };
