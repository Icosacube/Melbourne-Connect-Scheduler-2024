import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {FC, useEffect, useState} from 'react';
import {Catering, MainEvent, FundingAccount} from "../../../../types/frontendTypes";
import {getCateringByEventID} from "../../../../scripts/catering/functions";
import Headline from "./Headline";
import {Box, Button, Typography} from "@mui/material";
import {getFundingAccounts} from "../../../../scripts/fundingAccount/functions";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import {CreateCateringModal} from "./CreateCateringModal";
import dayjs from "dayjs";

interface ServicesProps {
    event: MainEvent;
}

export const Services: FC<ServicesProps> = ({event}) => {

    const [catering, setCatering] = useState<Catering[]>([]);
    const [fundingAccounts, setFundingAccounts]
        = useState<FundingAccount[]>([]);
    const [fundingAccountMap, setFundingAccountMap]
        = useState<Map<string, string>>(new Map());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedCatering, fetchedFundingAccounts]
                    = await Promise.all([
                    getCateringByEventID(event.RecordID),
                    getFundingAccounts()
                ]);

                setCatering(fetchedCatering);
                setFundingAccounts(fetchedFundingAccounts);

                // Map funding record ID to themis string
                const map = new Map<string, string>();
                fetchedFundingAccounts.forEach(account => {
                    map.set(account.RecordID, account.ThemisString);
                });
                setFundingAccountMap(map);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [event.RecordID]);

    const handleAddCatering = (newCatering: Catering) => {
        setCatering((prevCatering) => [...prevCatering, newCatering]);
    };

    function getRowId(catering: Catering) {
        return catering.RecordID;
    }

    const columns: GridColDef<Catering>[] = [
        {
            field: 'BookingReference',
            headerName: 'Booking Reference',
            headerClassName: 'services-table',
            flex: 1,
        },
        {
            field: 'Description',
            headerName: 'Description',
            headerClassName: 'services-table',
            flex: 1,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            headerClassName: 'services-table',
            flex: 1,
            valueFormatter: (params) => {
                const value = params as number; // Access the value correctly
                return `$${value.toFixed(2)}`; // Format the number with 2 decimal places and add the $ symbol
            },
        },
        {
            field: 'ExpenseDate',
            headerName: 'Expense Date',
            headerClassName: 'services-table',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params);
                return dayjs(date).format('DD MMM YYYY');
            },
        },
        {
            field: 'FundingAccount',
            headerName: 'Funding Account',
            headerClassName: 'services-table',
            flex: 1,
            valueFormatter: (params) => {
                const value = params[0] as string;
                return fundingAccountMap.get(value);
            }
        }
    ];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box className='  mb-4 flex flex-col'>
                <Box className=' flex flex-col'>
                    <Button
                        variant='contained'
                        className=' flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12'
                        onClick={handleOpen}
                    >
                        <AddCircleOutlineOutlined/>
                        <Typography>Create Catering Entry</Typography>
                    </Button>
                    <CreateCateringModal open={open} handleClose={handleClose} eventID={event.RecordID}
                                         fundingAccounts={fundingAccountMap}
                                         addCatering={handleAddCatering} />
                </Box>
                <Box>
                    <DataGrid
                        rows={catering}
                        columns={columns}
                        getRowId={getRowId}
                        autoHeight
                        pageSizeOptions={[5, 10]}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 10},
                            },
                        }}
                        checkboxSelection
                        sx={{
                            '& .services-table': {
                                backgroundColor: '#FBE418',
                                color: 'black',
                            },
                            '.MuiDataGrid-columnHeaderTitleContainer': {
                                backgroundColor: '#FBE418',
                            },
                        }}
                    />
                </Box>
            </Box>
        </>

    );
};