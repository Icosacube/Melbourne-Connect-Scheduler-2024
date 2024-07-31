// import React from 'react';
// import { EventStatus } from '../../types/types';
// import { Chip } from '@mui/material';

// export function getStatus(status: EventStatus | null): React.ReactElement | null {
//   switch (status) {
//     case 'Completed':
//       return <Chip label={status} color="success" variant="outlined" />;
//     case 'Cancelled':
//       return <Chip label={status} color="error" variant="outlined" />;
//     case 'Ongoing':
//       return <Chip label={status} color="info" variant="outlined" />;
//     case 'Preparation':
//       return (
//         <Chip label={status} sx={{ color: 'orange', borderColor: 'orange' }} variant="outlined" />
//       );
//     case 'Implementation':
//       return (
//         <Chip label={status} sx={{ color: 'purple', borderColor: 'purple' }} variant="outlined" />
//       );
//     default:
//       return null; // Return null for cases where status does not match any known types
//   }
// }
