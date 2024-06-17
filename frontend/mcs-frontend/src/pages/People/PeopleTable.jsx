import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
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
    type: 'date',
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
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@university.edu',
    university: 'Tech University',
    role: 'Assistant Professor',
    faculty: 'Engineering',
    lastArrived: new Date(2024, 5, 16)
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@university.edu',
    university: 'Innovation University',
    role: 'Associate Professor',
    faculty: 'Mathematics',
    lastArrived: new Date(2024, 5, 17)
  },
  {
    id: 4,
    firstName: 'Dave',
    lastName: 'Brown',
    email: 'dave.brown@university.edu',
    university: 'Creative University',
    role: 'Lecturer',
    faculty: 'Physics',
    lastArrived: new Date(2024, 5, 18)
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Davis',
    email: 'eve.davis@university.edu',
    university: 'Science University',
    role: 'Senior Lecturer',
    faculty: 'Chemistry',
    lastArrived: new Date(2024, 5, 19)
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank.miller@university.edu',
    university: 'Advanced University',
    role: 'Researcher',
    faculty: 'Biology',
    lastArrived: new Date(2024, 5, 20)
  },
  {
    id: 7,
    firstName: 'Grace',
    lastName: 'Wilson',
    email: 'grace.wilson@university.edu',
    university: 'Tech Institute',
    role: 'Adjunct Professor',
    faculty: 'Statistics',
    lastArrived: new Date(2024, 5, 21)
  },
  {
    id: 8,
    firstName: 'Heidi',
    lastName: 'Moore',
    email: 'heidi.moore@university.edu',
    university: 'Innovation Institute',
    role: 'Postdoctoral Fellow',
    faculty: 'Astronomy',
    lastArrived: new Date(2024, 5, 22)
  },
  {
    id: 9,
    firstName: 'Ivan',
    lastName: 'Taylor',
    email: 'ivan.taylor@university.edu',
    university: 'Research University',
    role: 'Visiting Professor',
    faculty: 'Geology',
    lastArrived: new Date(2024, 5, 23)
  },
  {
    id: 10,
    firstName: 'Judy',
    lastName: 'Anderson',
    email: 'judy.anderson@university.edu',
    university: 'Higher Learning Institute',
    role: 'Dean',
    faculty: 'Environmental Science',
    lastArrived: new Date(2024, 5, 24)
  },
  {
    id: 11,
    firstName: 'Judy',
    lastName: 'Anderson',
    email: 'judy.anderson@university.edu',
    university: 'Higher Learning Institute',
    role: 'Dean',
    faculty: 'Environmental Science',
    lastArrived: new Date(2024, 5, 24)
  }
];

export default function PeopleTable() {
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    console.log(params.row.id);
    navigate(`/people/${params.row.id}`);
  };
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        }
      }}
      pageSizeOptions={[5, 10]}
      // checkboxSelection
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
}
