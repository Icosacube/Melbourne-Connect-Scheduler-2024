import React, { useState } from 'react';
import createSpeaker from '../../scripts';
import { Modal } from '@mui/material';

function CreatePeopleModal({ handleClose, open }) {
  // state data for speaker
  const [newSpeaker, setNewSpeaker] = useState({
    // TODO: speaker fields as per backend types
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
        aria-describedby="modal-modal-description">
            TODO
        </Modal>
    </>
  );
}
