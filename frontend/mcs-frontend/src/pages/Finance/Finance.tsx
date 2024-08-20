import React, { FC } from 'react'
import { FinanceTable } from './FinanceTable'
import dayjs from 'dayjs'
import { Finance as FinanceType } from '../../types/frontendTypes'

type FinanceRow = FinanceType & {
    EventName: string
}

// Sample data with Event Names
const dummyData: (FinanceRow & { isGroup?: boolean })[] = [
    {
        RecordID: '1',
        MainEvent: 'ME001',
        EventName: 'AI Conference 2024',
        ExpenseCategory: 'Travel',
        ExpenseDescription: 'Flight to Conference',
        Cost: 500.0,
        ExpenseDate: dayjs('2024-08-20'),
        FundingAccount: 'FA123',
    },
    {
        RecordID: '2',
        MainEvent: 'ME001',
        EventName: 'AI Conference 2024',
        ExpenseCategory: 'Accommodation',
        ExpenseDescription: 'Hotel Stay',
        Cost: 300.0,
        ExpenseDate: dayjs('2024-08-21'),
        FundingAccount: 'FA124',
    },
    {
        RecordID: '3',
        MainEvent: 'ME002',
        EventName: 'Tech Summit 2024',
        ExpenseCategory: 'Catering',
        ExpenseDescription: 'Lunch for Team',
        Cost: 150.0,
        ExpenseDate: dayjs('2024-08-22'),
        FundingAccount: 'FA125',
    },
    {
        RecordID: '4',
        MainEvent: 'ME002',
        EventName: 'Tech Summit 2024',
        ExpenseCategory: 'Supplies',
        ExpenseDescription: 'Conference Materials',
        Cost: 200.0,
        ExpenseDate: dayjs('2024-08-23'),
        FundingAccount: 'FA126',
    },
    {
        RecordID: '5',
        MainEvent: 'ME003',
        EventName: 'Innovation Expo 2024',
        ExpenseCategory: 'Entertainment',
        ExpenseDescription: 'Team Dinner',
        Cost: 400.0,
        ExpenseDate: dayjs('2024-08-24'),
        FundingAccount: 'FA127',
    },
    {
        RecordID: '6',
        MainEvent: 'ME003',
        EventName: 'Innovation Expo 2024',
        ExpenseCategory: 'Travel',
        ExpenseDescription: 'Return Flight',
        Cost: 550.0,
        ExpenseDate: dayjs('2024-08-26'),
        FundingAccount: 'FA128',
    },
    {
        RecordID: '7',
        MainEvent: 'ME004',
        EventName: 'Leadership Workshop 2024',
        ExpenseCategory: 'Accommodation',
        ExpenseDescription: 'Extended Hotel Stay',
        Cost: 350.0,
        ExpenseDate: dayjs('2024-08-27'),
        FundingAccount: 'FA129',
    },
    {
        RecordID: '8',
        MainEvent: 'ME004',
        EventName: 'Leadership Workshop 2024',
        ExpenseCategory: 'Catering',
        ExpenseDescription: 'Breakfast Meeting',
        Cost: 100.0,
        ExpenseDate: dayjs('2024-08-28'),
        FundingAccount: 'FA130',
    },
    {
        RecordID: '9',
        MainEvent: 'ME001',
        EventName: 'AI Conference 2024',
        ExpenseCategory: 'Miscellaneous',
        ExpenseDescription: 'Printing Services',
        Cost: 75.0,
        ExpenseDate: dayjs('2024-08-29'),
        FundingAccount: 'FA131',
    },
    {
        RecordID: '10',
        MainEvent: 'ME002',
        EventName: 'Tech Summit 2024',
        ExpenseCategory: 'Supplies',
        ExpenseDescription: 'Office Supplies',
        Cost: 120.0,
        ExpenseDate: dayjs('2024-08-30'),
        FundingAccount: 'FA132',
    },
]

export const Finance: FC = () => {
    return <FinanceTable rows={dummyData} />
}
