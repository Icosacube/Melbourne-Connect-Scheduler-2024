// Type definitions for the application
import dayjs from 'dayjs';

export type Speaker = {
    id: number;
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

enum EventStatus {
    Preparation = 'Preparation',
    Implementation = 'Implementation',
    Ongoing = 'Ongoing',
    Completed = 'Completed',
    Cancelled = 'Cancelled'}

export type Event = {
    id: number;
    name: string;
    date: dayjs.Dayjs;
    venue: Venue[];
    speakers: Speaker[];
    description: string;
    abstract: string;
    status: EventStatus;
    catering: Cater;
}

export type Cater= {
    id: number;
    name: string;
}