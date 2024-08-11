import { DataGrid } from '@mui/x-data-grid';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GridColDef } from '@mui/x-data-grid';
import { MainEvent, Speaker, Trip } from '../../../types/frontendTypes';

interface TripTableProps {
  events: MainEvent[];
  speakers: Speaker[];
  trips: Trip[];
}

export const TripTable: FC<TripTableProps> = ({ events, speakers, trips }) => {
  const navigate = useNavigate();

  const handleRowClick = (params: { row: Trip }) => {
    navigate(`/trips/${params.row.RecordID}`);
  };

  function getRowId(trip: Trip) {
    return trip.RecordID;
  }

  const columns: GridColDef<Trip>[] = [
    {
      field: 'StartDate',
      headerName: 'Start Date',
      headerClassName: 'trip-table',
      width: 160,
    },
    {
      field: 'GuestSpeaker',
      headerName: 'Guest Speaker',
      headerClassName: 'trip-table',
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      renderCell: (params) => {
        const speakerIds = params.row.GuestSpeaker;
        const speakerNames = speakerIds
          .map((id) => {
            const speaker = speakers.find((speaker) => speaker.RecordID === id);
            return speaker ? `${speaker.FirstName} ${speaker.LastName}` : null;
          })
          .filter((name) => name !== null);

        return speakerNames.join(', ');
      },
    },
    {
      field: 'MainEvent',
      headerName: 'Main Event',
      headerClassName: 'trip-table',
      flex: 1,
      minWidth: 280,
      renderCell: (params) => {
        const eventIds = params.row.MainEvent;
        const eventNames = eventIds
          .map((id) => {
            const event = events.find((event) => event.RecordID === id);
            return event ? event.EventName : null;
          })
          .filter((name) => name !== null);

        return eventNames.join(', ');
      },
    },
    {
      field: 'Completed',
      headerName: 'Completed',
      headerClassName: 'trip-table',
      width: 90,
    },
  ];

  return (
    <DataGrid
      rows={trips}
      columns={columns}
      getRowId={getRowId}
      pageSizeOptions={[5, 10]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      checkboxSelection
      sx={{
        '& .trip-table': {
          backgroundColor: '#FBE418',
          color: 'black',
        },
        '.MuiDataGrid-columnHeaderTitleContainer': {
          backgroundColor: '#FBE418',
        },
      }}
      onRowClick={handleRowClick}
    />
  );
};
