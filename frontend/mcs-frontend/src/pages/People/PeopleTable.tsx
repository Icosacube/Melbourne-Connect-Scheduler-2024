import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', headerClassName: 'speaker-table', width: 50 },
  {
    field: 'firstName',
    headerName: 'First Name',
    headerClassName: 'speaker-table',
    width: 100
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    headerClassName: 'speaker-table',
    flex: 1,
    width: 120
  },
  { field: 'email', headerName: 'Email', headerClassName: 'speaker-table', flex: 1, width: 300 },
  {
    field: 'university',
    headerName: 'University',
    headerClassName: 'speaker-table',
    flex: 1,
    width: 200
  },
  { field: 'role', headerName: 'Role', headerClassName: 'speaker-table', flex: 1, width: 150 },
  {
    field: 'faculty',
    headerName: 'Faculty',
    headerClassName: 'speaker-table',
    flex: 1,
    width: 150
  },
  {
    field: 'lastArrived',
    headerName: 'Last Arrived',
    headerClassName: 'speaker-table',
    flex: 1,
    width: 130
  }
];

const rows = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@university.edu',
    university: 'University of Wonderland',
    role: 'Professor',
    faculty: 'Computer Science',
    lastArrived: new Date(2024, 5, 15)
  },
  // Add other rows as needed
];

export const PeopleTable: FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (params: { row: { id: any } }) => {
    console.log(params.row.id);
    navigate(`/people/${params.row.id}`);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[5, 10]}
      initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 10 }
        }
        }}
      checkboxSelection
      sx={{
        '& .speaker-table': {
          backgroundColor: '#BF4242',
          color: '#EBF5EE'
        },
        '.MuiDataGrid-columnHeaderTitleContainer': {
          backgroundColor: '#BF4242'
        }
      }}
      onRowClick={handleRowClick}
    />
  );
};
