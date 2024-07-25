import React, { useState } from 'react';
import createSpeaker from '../../scripts/createSpeaker';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  MenuItem,
  Modal,
  Select,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';

const CreatePeopleModal = ({ handleClose, open }) => {
  // state data for speaker
  const [newSpeaker, setNewSpeaker] = useState({
    PrimaryEmail: '',
    FirstName: '',
    LastName: '',
    Pronouns: '',
    Title: '',
    AlternativeTitle: '',
    Phone: '',
    Bio: '',
    Headshot: '',
    PreferredTimezone: 'Ten', // TODO: timezone selector
    WorkTitle: '',
    Organisation: '',
    Department: '',
    Address: '',
    CitySuburb: '',
    State: '', // optional
    Country: '',
    Postcode: '', // optional
    EmergencyContactName: '',
    EmergencyContactRelationship: '',
    EmergencyContactNumber: '',
    FlyerMembershipName: '',
    FlyerMembershipNumber: '', // Using string to account for string type ID
    Confirmed: false,
    Trip: [],
    MainEvent: [],
    SubEvent: []
  });

  // success or failure message
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Otherwise, update the edited event data
    setNewSpeaker({ ...newSpeaker, [name]: value });
  };

  // When saving, show success/failure message, create the new speaker and post to backend
  const handleSave = () => {
    setShowSuccess(false);
    handleClose();
    console.log(newSpeaker);
    var res = createSpeaker(newSpeaker);
    if (res.status == 200) {
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }, 0);
    } else {
      // handle failure
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto place-content-center ">
        <Box className="absolute inset-0 justify-center bg-white p-10 rounded-xl w-3/4">
          <Box className="w-full p-7 flex space-x-6">
            {/* First Column */}
            <Box className="space-y-4">
              <Stack>
                <Typography variant="h6">Email Address *</Typography>
                <TextField
                  required
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  name="PrimaryEmail"
                  defaultValue={newSpeaker.PrimaryEmail}
                  value={newSpeaker.PrimaryEmail}
                  onChange={handleInputChange}
                />
              </Stack>
              <Box className="flex justify-between space-x-2">
                <Stack>
                  <Typography variant="h6">First Name *</Typography>
                  <TextField
                    required
                    className="bg-gray-100 p-4 rounded-xl "
                    variant="outlined"
                    name="FirstName"
                    defaultValue={newSpeaker.FirstName}
                    value={newSpeaker.FirstName}
                    onChange={handleInputChange}
                  />
                </Stack>

                <Stack>
                  <Typography variant="h6">Last Name *</Typography>
                  <TextField
                    required
                    className="bg-gray-100 p-4 rounded-xl "
                    variant="outlined"
                    name="LastName"
                    defaultValue={newSpeaker.LastName}
                    value={newSpeaker.LastName}
                    onChange={handleInputChange}
                  />
                </Stack>
              </Box>
              <Box className="flex justify-between space-x-2">
                <Stack>
                  {/* Should title be a dropdown? */}
                  <Typography variant="h6">Title</Typography>
                  <TextField
                    required
                    className="bg-gray-100 p-4 font-medium rounded-xl "
                    variant="outlined"
                    name="Title"
                    defaultValue={newSpeaker.Title}
                    value={newSpeaker.Title}
                    onChange={handleInputChange}
                  />
                </Stack>
                <Stack>
                  <Typography variant="h6">Alternative Title</Typography>
                  <TextField
                    className="bg-gray-100 p-4 font-medium rounded-xl "
                    variant="outlined"
                    name="Title"
                    defaultValue={newSpeaker.Title}
                    value={newSpeaker.Title}
                    onChange={handleInputChange}
                  />
                </Stack>
              </Box>

              <Stack>
                <Typography variant="h6">Pronouns</Typography>
                <TextField
                  required
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Pronouns"
                  defaultValue={newSpeaker.Pronouns}
                  value={newSpeaker.Pronouns}
                  onChange={handleInputChange}
                  label="She/her"
                />
              </Stack>

              <Stack>
                {/* TODO: VALIDATE PHONE NUMBER WITH REGEX???
                https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript */}
                <Typography variant="h6">Phone Number</Typography>
                <TextField
                  required
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Phone"
                  defaultValue={newSpeaker.Phone}
                  value={newSpeaker.Phone}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack>
                <Typography variant="h6">Biography</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Bio"
                  defaultValue={newSpeaker.Bio}
                  value={newSpeaker.Bio}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack>
                <Typography variant="h6">Photo</Typography>
                <p> YO WE NEED AN UPLOAD FIELD HERE</p>
              </Stack>

              <Stack>
                <Typography variant="h6">Preferred Timezone</Typography>
                <Select
                  required
                  className="bg-gray-100  font-medium rounded-xl "
                  variant="outlined"
                  name="PreferredTimezone"
                  defaultValue={newSpeaker.PreferredTimezone}
                  value={newSpeaker.PreferredTimezone}
                  onChange={handleInputChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Stack>
              <hr />

              <Stack>
                <Typography variant="h6">Work Title/Role</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="WorkTitle"
                  defaultValue={newSpeaker.WorkTitle}
                  value={newSpeaker.WorkTitle}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack>
                <Typography variant="h6">Organisation</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Organisation"
                  defaultValue={newSpeaker.Organisation}
                  value={newSpeaker.Organisation}
                  onChange={handleInputChange}
                />
              </Stack>

              <Stack>
                <Typography variant="h6">Department</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Department"
                  defaultValue={newSpeaker.Department}
                  value={newSpeaker.Department}
                  onChange={handleInputChange}
                />
              </Stack>

              <hr />

              <Box className="flex justify-between space-x-2">
                <Stack>
                  <Typography variant="h6">Address</Typography>
                  <TextField
                    className="bg-gray-100 p-4 font-medium rounded-xl "
                    variant="outlined"
                    name="Address"
                    defaultValue={newSpeaker.Address}
                    value={newSpeaker.Address}
                    onChange={handleInputChange}
                  />
                </Stack>

                <Stack>
                  <Typography variant="h6">CitySuburb</Typography>
                  <TextField
                    className="bg-gray-100 p-4 font-medium rounded-xl "
                    variant="outlined"
                    name="CitySuburb"
                    defaultValue={newSpeaker.CitySuburb}
                    value={newSpeaker.CitySuburb}
                    onChange={handleInputChange}
                  />
                </Stack>
              </Box>

              <Box className="flex justify-between space-x-2">
                <Stack>
                  <Typography variant="h6">State</Typography>
                  <TextField
                    className="bg-gray-100 p-4 font-medium rounded-xl "
                    variant="outlined"
                    name="Address"
                    defaultValue={newSpeaker.Address}
                    value={newSpeaker.Address}
                    onChange={handleInputChange}
                  />
                </Stack>

                <Stack>
                  <Typography variant="h6">Country</Typography>
                  <Select
                    required
                    className="bg-gray-100  font-medium rounded-xl "
                    variant="outlined"
                    name="Country"
                    defaultValue={newSpeaker.Country}
                    value={newSpeaker.Country}
                    onChange={handleInputChange}>
                    <MenuItem value={'Australia'}>Australia</MenuItem>
                    <MenuItem value={'Australia 2'}>Australia 2</MenuItem>
                  </Select>
                </Stack>
              </Box>

              <Stack>
                <Typography variant="h6">Postcode</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Postcode"
                  defaultValue={newSpeaker.Postcode}
                  value={newSpeaker.Postcode}
                  onChange={handleInputChange}
                />
              </Stack>

              <hr />

              <Stack>
                <Typography variant="h6">EmergencyContactName</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="EmergencyContactName"
                  defaultValue={newSpeaker.EmergencyContactName}
                  value={newSpeaker.EmergencyContactName}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">EmergencyContactRelationship</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="EmergencyContactRelationship"
                  defaultValue={newSpeaker.EmergencyContactRelationship}
                  value={newSpeaker.EmergencyContactRelationship}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">EmergencyContactNumber</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="EmergencyContactNumber"
                  defaultValue={newSpeaker.EmergencyContactNumber}
                  value={newSpeaker.EmergencyContactNumber}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">FlyerMembershipName</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="FlyerMembershipName"
                  defaultValue={newSpeaker.FlyerMembershipName}
                  value={newSpeaker.FlyerMembershipName}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">FlyerMembershipNumber</Typography>
                <TextField
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="FlyerMembershipNumber"
                  defaultValue={newSpeaker.FlyerMembershipNumber}
                  value={newSpeaker.FlyerMembershipNumber}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Confirmed</Typography>
                <Checkbox
                  className="bg-gray-100 p-4 font-medium rounded-xl "
                  variant="outlined"
                  name="Confirmed"
                  defaultValue={newSpeaker.Confirmed}
                  value={newSpeaker.Confirmed}
                  onChange={handleInputChange}
                />
              </Stack>

              {/* THESE NEED LOADER DATA */}
              <Stack>
                  <Typography variant="h6">Trip</Typography>
                  <Select
                    required
                    className="bg-gray-100  font-medium rounded-xl "
                    variant="outlined"
                    name="Trip"
                    defaultValue={newSpeaker.Trip}
                    value={newSpeaker.Trip}
                    onChange={handleInputChange}>
                    {/* LOAD TRIP DATA FROM BACKEND */}
                  </Select>
                </Stack>
                <Stack>
                  <Typography variant="h6">MainEvent</Typography>
                  <Select
                    required
                    className="bg-gray-100  font-medium rounded-xl "
                    variant="outlined"
                    name="PreferredTimezone"
                    defaultValue={newSpeaker.MainEvent}
                    value={newSpeaker.MainEvent}
                    onChange={handleInputChange}>
                    {/* Main Event Data from backend */}
                  </Select>
                </Stack>
                <Stack>
                  <Typography variant="h6">SubEvent</Typography>
                  <Select
                    required
                    className="bg-gray-100  font-medium rounded-xl "
                    variant="outlined"
                    name="SubEvent"
                    defaultValue={newSpeaker.SubEvent}
                    value={newSpeaker.SubEvent}
                    onChange={handleInputChange}>
                    {/* Sub event?? from backend?? */}
                  </Select>
                </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Success or failure */}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}>
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Event updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePeopleModal;
