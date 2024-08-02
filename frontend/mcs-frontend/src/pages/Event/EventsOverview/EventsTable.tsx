import { DataGrid } from '@mui/x-data-grid';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GridColDef } from '@mui/x-data-grid';
import { MainEvent, Speaker } from '../../../types/types';

interface EventsTableProps {
  events: MainEvent[];
  speakers: Speaker[];
}

export const EventsTable: FC<EventsTableProps> = ({ events, speakers }) => {
  const navigate = useNavigate();
  const handleRowClick = (params: { row: MainEvent }) => {
    navigate(`/events/${params.row.RecordID}`);
  };

  function getRowId(event: MainEvent) {
    return event.RecordID;
  }

  const columns: GridColDef<MainEvent>[] = [
    {
      field: 'EventName',
      headerName: 'Event Name',
      headerClassName: 'event-table',
      flex: 1,
      width: 280,
    },
    {
      field: 'Date',
      headerName: 'Date',
      headerClassName: 'event-table',
      width: 280,
    },
    {
      field: 'Speaker',
      headerName: 'Speaker',
      headerClassName: 'event-table',
      flex: 0,
      minWidth: 280,
      renderCell: (params) => {
        const speakerIds = params.row.Speaker;
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
      field: 'Completed',
      headerName: 'Completed',
      headerClassName: 'event-table',

      width: 100,
    },
  ];

  return (
    <DataGrid
      rows={events}
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
        '& .event-table': {
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
