import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'supplier', headerName: 'Name / Supplier', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'bookingReference', headerName: 'Booking Reference', width: 200 },
    { field: 'quoteInvoice', headerName: 'Quote / Invoice Ref', width: 200 },
    { field: 'subtotal', headerName: 'Subtotal', width: 150 },
    { field: 'gst', headerName: 'GST', width: 100 },
    { field: 'surcharge', headerName: 'Surcharge', width: 150 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 200 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 200 },
    { field: 'notes', headerName: 'Notes', width: 300 },
]

// Sample rows including date groupings
const rows = [
    {
        id: 'group-2023-06-20',
        date: '2023.06.20',
        isGroup: true,
        category:
            'Accelerating Positive AI Adoption and Innovation | Keynote Speaker: Stela Solar',
    },
    {
        id: 1,
        date: '2023.06.20',
        category: 'Airfare',
        supplier: 'Dr Vladana SOLAR',
        description: 'Canberra - Melbourne One Way (Red e-Deal)',
        bookingReference: '4Q9DYZ',
        quoteInvoice: 'N/A',
        subtotal: '$173.97',
        gst: '$63.45',
        surcharge: '-',
        totalAmount: '$239.84',
        paymentMethod: 'EH C/C',
        notes: 'N/A',
    },
    {
        id: 2,
        date: '2023.06.20',
        category: 'Hotel',
        supplier: 'Rendezvous Flinders St',
        description: 'Check In: 19/6/23, Check Out: 20/6/23',
        bookingReference: '22660724',
        quoteInvoice: 'N/A',
        subtotal: '$205.74',
        gst: 'N/A',
        surcharge: '-',
        totalAmount: '$205.74',
        paymentMethod: 'EH C/C',
        notes: 'Hannah to provide copy of receipt later.',
    },
    {
        id: 'group-2023-07-25',
        date: '2023.07.25',
        isGroup: true,
        category: 'XX | Keynote Speaker: Dinh Phung',
    },
    {
        id: 3,
        date: '2023.07.25',
        category: 'Catering',
        supplier: 'Atlantic Catering',
        description: 'Canapes 2 x Cold: 60 pax, 2 x Hot: 60 pax',
        bookingReference: 'Booking Sheet Ref: 1986',
        quoteInvoice: 'AGH INV-04307',
        subtotal: '$1,936.42',
        gst: '$193.64',
        surcharge: '-',
        totalAmount: '$2,130.06',
        paymentMethod: 'Ed’s CC',
        notes: 'Atlantic charged $37.28 processing fee to cc payment.',
    },
]

export const FinanceTable = () => {
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowClassName={(params) =>
                    params.row.isGroup ? 'group-row' : 'data-row'
                }
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    },
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                        whiteSpace: 'nowrap', // Prevent text wrapping
                    },
                    '& .group-row .MuiDataGrid-cell': {
                        display: 'block',
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        whiteSpace: 'normal', // Allow the group row to wrap if needed
                    },
                }}
            />
        </Box>
    )
}
