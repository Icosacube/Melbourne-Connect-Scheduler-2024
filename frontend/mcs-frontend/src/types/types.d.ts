// Type definitions for the application
import dayjs from 'dayjs';

export type Speaker = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export type Venue = {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

export enum EventStatus {
    Preparation = 'Preparation',
    Implementation = 'Implementation',
    Ongoing = 'Ongoing',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export type Event = {
    id: string;
    name?: string;
    date?: dayjs.Dayjs;
    venue?: Venue[];
    speakers?: Speaker[];
    description?: string;
    abstract?: string;
    status: EventStatus;
    catering?: Cater;
}

export type Cater= {
    id: number;
    name: string;
}

export type Trip = {
    StartDate: string; // Example Format: "2024-04-30"
    EndDate: string; // Example Format: "2024-04-30"
    Duration?: number;
    GuestSpeaker: string[];
    MainEvent: string[];
    Accommodation: string[];
    Flight: string[];
    Miscellaneous: string[];
    AcademicCanvassing: string[];
    Completed: boolean;
}