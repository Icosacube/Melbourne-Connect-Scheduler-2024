import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {FC, useEffect, useState} from 'react';
import {Catering, MainEvent, FundingAccount} from "../../../../types/frontendTypes";
import {getCateringByEventID} from "../../../../scripts/catering/functions";
import Headline from "./Headline";
import {Box} from "@mui/material";
import {getFundingAccounts} from "../../../../scripts/fundingAccount/functions";

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
                const value = params as number;
                return `$${value.toFixed(2)}`; // Format the number with 2 decimal places
            }
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

    return (
        <Box>
            <Headline/>
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
    );
};