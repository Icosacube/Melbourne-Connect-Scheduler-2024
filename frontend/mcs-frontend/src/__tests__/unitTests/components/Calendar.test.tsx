import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calendar } from '../../../components/Calendar/Calendar';

// Mock FullCalendar as it's a complex component
jest.mock('@fullcalendar/react', () => {
  return function DummyCalendar() {
    return <div data-testid="full-calendar">FullCalendar</div>;
  };
});

describe('Calendar', () => {
  const mockEvents = [
    { title: 'Event 1', start: '2024-08-01' },
    { title: 'Event 2', start: '2024-08-02' },
  ];

  it('renders FullCalendar component', () => {
    render(<Calendar events={mockEvents} />);
    expect(screen.getByTestId('full-calendar')).toBeInTheDocument();
  });
});