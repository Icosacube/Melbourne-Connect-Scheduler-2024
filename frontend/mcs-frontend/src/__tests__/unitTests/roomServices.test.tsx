/**
 *@description
 * This test suite validates the functionality of the `RoomServicesTable` component
 * for managing room services. It ensures the correct behavior of UI elements such as
 * the table display, modals for creating and updating room services,
 * and the deletion confirmation dialog.
 *
 * @tests
 * - Renders the table with room services data and validates that the correct information
 *   (service description, cost, etc.) is displayed.
 * - Opens the create modal when the "Add Room Service" button is clicked and verifies
 *   that the form submission calls the `createRoomService` function with the expected data.
 * - Opens the update modal when the "Edit" button is clicked and verifies that the form
 *   submission calls `updateRoomServiceByID` function with the expected data.
 * - Opens the delete confirmation dialog when the "Delete" button is clicked, and confirms
 *   that the `deleteRoomServiceByID` function is called correctly upon confirmation.
 *
 * @mocks
 * - Mock implementations for the `createRoomService`, `deleteRoomServiceByID` and
 *   `updateRoomServiceByID` functions, and the `useRevalidator` hook from 'react-router-dom'
 *   to simulate data submission and page revalidation without actual API calls.
 *
 * @note
 * - External dependencies like `axios` and routing functions are mocked to isolate the
 *   tests from the backend.
 * - The form field values in the modals are handled using user event simulation provided
 *   by `@testing-library/user-event`.
 */

import '@testing-library/jest-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { RoomServicesTable } from '../../pages/Event/EventView/TabPages/Services/RoomServicesTable'
import {
    createRoomService,
    deleteRoomServiceByID,
    updateRoomServiceByID,
} from '../../scripts/roomServices/functions'
import { FundingAccount, Service } from '../../types/frontendTypes'

// Mocking external dependencies
jest.mock('../../scripts/roomServices/functions', () => ({
    deleteRoomServiceByID: jest.fn(),
    createRoomService: jest.fn(),
    updateRoomServiceByID: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    useRevalidator: jest.fn().mockReturnValue({
        revalidate: jest.fn(),
    }),
}))

const mockRoomServices: Service[] = [
    {
        RecordID: '1',
        Cost: 100,
        ServiceDescription: 'Room Cleaning',
        ExpenseDate: dayjs(),
        Notes: 'Daily Cleaning Service',
        FundingAccount: ['account1'],
        MainEvent: [''],
        Finance: [''],
    },
]

const mockFundingAccounts: FundingAccount[] = [
    {
        RecordID: 'account1',
        ThemisString: '1111',
        Description: '',
        AccountUser: '',
        AccountType: '',
        Notes: '',
        Limit: 10000,
        ExpiryDate: dayjs(),
        Accommodation: [''],
        Miscellaneous: [''],
        Venue: [''],
        Catering: [''],
        Flight: [''],
        Service: [''],
    },
]

describe('RoomServicesTable', () => {
    test('renders the table with room services data', () => {
        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        // Check if table headers are rendered
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Cost')).toBeInTheDocument()
        expect(screen.getByText('Expense Date')).toBeInTheDocument()
        expect(screen.getByText('Notes')).toBeInTheDocument()
        expect(screen.getByText('Funding Account')).toBeInTheDocument()

        // Check if room service data is rendered
        expect(screen.getByText('Room Cleaning')).toBeInTheDocument()
        expect(screen.getByText('Daily Cleaning Service')).toBeInTheDocument()
        expect(screen.getByText('$100.00')).toBeInTheDocument() // Cost formatting
    })

    test('opens create modal when Add Room Service button is clicked', async () => {
        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const addButton = screen.getByText('Add Room Service')
        await userEvent.click(addButton)

        // Check if the create modal opens
        expect(await screen.findByText('Submit')).toBeInTheDocument()
    })

    test('confirms creation and calls createRoomService', async () => {
        const mockCreateRoomService = createRoomService as jest.Mock

        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const addButton = screen.getByText('Add Room Service')
        await userEvent.click(addButton)

        const modal = await screen.findByRole('dialog')

        await userEvent.type(
            within(modal).getByLabelText('Description'),
            'New Room Service'
        )
        await userEvent.type(
            within(modal).getByLabelText('Notes'),
            'Room Service Notes'
        )

        // Submit the form by clicking the submit button inside the modal
        await userEvent.click(within(modal).getByText('Submit'))

        // Wait for the createRoomService function to be called with the correct arguments
        await waitFor(() =>
            expect(mockCreateRoomService).toHaveBeenCalledWith(
                expect.objectContaining({
                    ServiceDescription: 'New Room Service',
                    Notes: 'Room Service Notes',
                }),
                'event1'
            )
        )
    })

    test('opens update modal when Edit button is clicked', async () => {
        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const editButton = screen.getByLabelText('Edit')
        await userEvent.click(editButton)

        // Wait for the update modal to open
        expect(
            await screen.findByText('Update Room Service')
        ).toBeInTheDocument()
    })

    test('confirms update and calls updateRoomServiceByID', async () => {
        const mockUpdateRoomServiceByID = updateRoomServiceByID as jest.Mock

        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const editButton = screen.getByLabelText('Edit')
        await userEvent.click(editButton)

        const modal = await screen.findByRole('dialog')

        // Fill in the form fields for updating a room service
        await userEvent.clear(within(modal).getByLabelText('Description'))
        await userEvent.type(
            within(modal).getByLabelText('Description'),
            'Updated Room Service'
        )
        await userEvent.click(within(modal).getByText('Submit'))

        await waitFor(() =>
            expect(mockUpdateRoomServiceByID).toHaveBeenCalledWith(
                expect.objectContaining({
                    ServiceDescription: 'Updated Room Service',
                    RecordID: '1',
                })
            )
        )
    })

    test('opens delete confirmation dialog when Delete button is clicked', async () => {
        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const deleteButton = screen.getByLabelText('Delete')
        await userEvent.click(deleteButton)

        // Wait for the delete confirmation dialog
        expect(
            await screen.findByText(
                'Are you sure you want to delete this item?'
            )
        ).toBeInTheDocument()
    })

    test('confirms deletion and calls deleteRoomServiceByID', async () => {
        const mockDeleteRoomServiceByID = deleteRoomServiceByID as jest.Mock

        render(
            <RoomServicesTable
                eventId="event1"
                roomServices={mockRoomServices}
                fundingAccounts={mockFundingAccounts}
            />
        )

        const deleteButton = screen.getByLabelText('Delete')
        await userEvent.click(deleteButton)

        // Confirm the deletion
        const confirmDeleteButton = await screen.findByText('Delete')
        await userEvent.click(confirmDeleteButton)

        await waitFor(() =>
            expect(mockDeleteRoomServiceByID).toHaveBeenCalledWith('1')
        )
    })
})
