import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import TitleCard from './TitleCard';

function Services() {
  const invoices = [
    {
      date: 'March, 01, 2024',
      amount: '100',
      code: 'INV-001'
    },
    {
      date: 'March, 05, 2024',
      amount: '200',
      code: 'INV-002'
    },
    {
      date: 'March, 08, 2024',
      amount: '300',
      code: 'INV-003'
    },
    {
      date: 'March, 12, 2024',
      amount: '400',
      code: 'INV-004'
    },
    {
      date: 'March, 15, 2024',
      amount: '500',
      code: 'INV-005'
    }
  ];
  const billingInfo = [
    {
      repName: 'Oliver Liam',
      companyName: 'Viking Burrito',
      email: 'oliver@gmail.com',
      phone: '0424334556',
      vatNumber: 'FRB1482364',
      service: 'Catering'
    },
    {
      repName: 'Jonas Harper',
      companyName: 'Jonas Lightings',
      email: 'jlight@gmail.com',
      phone: '0446775867',
      vatNumber: 'KOI1232543',
      service: 'Lighting'
    },
    {
      repName: 'Elon James',
      companyName: 'Fiber Notion',
      email: 'fiber@gmail.com',
      phone: '045698457',
      vatNumber: 'FIB123456',
      service: 'Party Supplies'
    }
  ];
  return (
    <Box className="space-y-5">
      <TitleCard />
      <Box className="flex space-x-10">
        {/* Billing Section */}
        <Box className="bg-white shadow-md rounded-xl p-6 w-1/2">
          <Box className="flex justify-between">
            <Typography variant="h5" className="font-semibold mb-8">
              Billing Information
            </Typography>
            <Box>
              <Button
                startIcon={<AddBoxIcon />}
                variant="outlined"
                className="text-secondary border-secondary h-10 mr-3">
                Add New
              </Button>
              <Button variant="outlined" className="text-secondary border-secondary h-10">
                View All
              </Button>
            </Box>
          </Box>
          {billingInfo.map((billing, index) => (
            <Box className="bg-gray-200 mb-5 p-5 rounded-md">
              <Stack>
                <Box className="mb-3 flex justify-between ">
                  <Typography variant="h6" className="font-bold mb-3">
                    {billing.repName}
                  </Typography>
                  <Box className="flex place-items-center space-x-4">
                    <Button startIcon={<DeleteIcon />} className="text-red-500">
                      Delete
                    </Button>
                    <Button startIcon={<EditIcon />} className="text-black">
                      Edit
                    </Button>
                  </Box>
                </Box>
                <Box className="flex space-x-3">
                  <Typography className=" text-gray-600">Company Name:</Typography>
                  <Typography className=" font-semibold">{billing.companyName}</Typography>
                </Box>
                <Box className="flex space-x-3">
                  <Typography className=" text-gray-600">Email:</Typography>
                  <Typography className=" font-semibold">{billing.email}</Typography>
                </Box>
                <Box className="flex space-x-3">
                  <Typography className=" text-gray-600">Phone Number:</Typography>
                  <Typography className=" font-semibold">{billing.phone}</Typography>
                </Box>
                <Box className="flex space-x-3">
                  <Typography className=" text-gray-600">Service:</Typography>
                  <Typography className=" font-semibold">{billing.service}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
        {/* Invoice section */}
        <Box className="bg-white shadow-md rounded-xl p-8 w-1/2 h-fit">
          <Box className="flex justify-between">
            <Typography variant="h5" className="font-semibold mb-8">
              Invoices
            </Typography>
            <Box>
              <Button
                startIcon={<AddBoxIcon />}
                variant="outlined"
                className="text-secondary border-secondary h-10 mr-3">
                Add New
              </Button>
              <Button variant="outlined" className="text-secondary border-secondary h-10">
                View All
              </Button>
            </Box>
          </Box>
          <Box>
            {invoices.map((invoice, index) => (
              <Box className="flex justify-between mb-7">
                <Stack>
                  <Typography variant="h6" className="font-bold">
                    {invoice.date}
                  </Typography>
                  <Typography className="text-gray-400">#{invoice.code}</Typography>
                </Stack>
                <Box className="flex space-x-5 place-items-center">
                  <Typography className="text-gray-400 mb-2">AUD {invoice.amount}</Typography>

                  <Button startIcon={<DownloadIcon />} className="text-orange-500">
                    PDF
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Services;
