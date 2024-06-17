import { Chip } from '@mui/material';

export function getStatus(status) {
  switch (status) {
    case 'Completed':
      return <Chip label={status} color="success" variant="outlined" />;
    case 'Cancelled':
      return <Chip label={status} color="error" variant="outlined" />;
    case 'Ongoing':
      return <Chip label={status} color="info" variant="outlined" />;
    case 'Preparation':
      return (
        <Chip label={status} sx={{ color: 'orange', borderColor: 'orange' }} variant="outlined" />
      );
    case 'Implementation':
      return (
        <Chip label={status} sx={{ color: 'purple', borderColor: 'purple' }} variant="outlined" />
      );
    default:
      return <></>;
  }
}
