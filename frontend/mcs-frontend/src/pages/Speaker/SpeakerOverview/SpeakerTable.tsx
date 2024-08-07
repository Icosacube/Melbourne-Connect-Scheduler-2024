import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Speaker, Trip } from "../../../types/frontendTypes";

interface SpeakerTableProps {
  speakers: Speaker[];
  trips: Trip[];
}



export const SpeakerTable: FC<SpeakerTableProps> = ({ speakers, trips }) => {
  const navigate = useNavigate();

  const handleRowClick = (params: { row: Speaker }) => {
    navigate(`/speaker/${params.row.RecordID}`);
  };

  function getRowId(row: Speaker): string {
    return row.RecordID;
  }

  const columns: GridColDef<Speaker>[] = [
    {
      field: "Title",
      headerName: "Title",
      headerClassName: "speaker-table",
      width: 70,
    },
    {
      field: "FirstName",
      headerName: "First Name",
      headerClassName: "speaker-table",
      width: 100,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      headerClassName: "speaker-table",
      width: 100,
    },
    {
      field: "PrimaryEmail",
      headerName: "Email",
      headerClassName: "speaker-table",
      flex: 1,
      width: 300,
    },
    {
      field: "Phone",
      headerName: "Phone",
      headerClassName: "speaker-table",
      flex: 1,
      width: 300,
    },
    {
      field: "Organisation",
      headerName: "Organisation",
      headerClassName: "speaker-table",
      flex: 1,
      width: 300,
    },
    {
      field: "Country",
      headerName: "Country",
      headerClassName: "speaker-table",
      flex: 1,
      width: 300,
    },
    {
      field: "Trip",
      headerName: "Upcoming Trip",
      headerClassName: "speaker-table",
      flex: 1,
      width: 300,
      renderCell: (params) => {
        const tripIds = params.row.Trip;
        const tripNames = tripIds
          .map((id) => {
            const trip = trips.find((trip) => trip.RecordID === id);
            return trip ? `(${trip.StartDate.format('YYYY-MM-DD')} - ${trip.EndDate.format('YYYY-MM-DD')})` : null;
          })
          .filter((name) => name !== null);
  
        return tripNames.join(', ');
      },
    },
  ];

  return (
    <DataGrid
      rows={speakers}
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
        "& .speaker-table": {
          backgroundColor: "#BF4242",
          color: "#EBF5EE",
        },
        ".MuiDataGrid-columnHeaderTitleContainer": {
          backgroundColor: "#BF4242",
        },
      }}
      onRowClick={handleRowClick}
    />
  );
};
