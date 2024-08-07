import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventTitle } from '../../components/EventTitle/EventTitle';

const mockEvent = {
  title: 'Test Event',
  date: '2024-08-04',
  time: '14:00',
  venue: 'Test Venue',
  isCompleted: false,
  speakerFirstName: 'John',
  speakerLastName: 'Doe'
};

describe('EventTitle', () => {
  it('renders event details correctly', () => {
    render(<EventTitle event={mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('2024-08-04 14:00')).toBeInTheDocument();
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows pending icon for incomplete events', () => {
    render(<EventTitle event={mockEvent} />);
    
    expect(screen.getByTestId('PendingIcon')).toBeInTheDocument();
  });

  it('shows check icon for completed events', () => {
    const completedEvent = { ...mockEvent, isCompleted: true };
    render(<EventTitle event={completedEvent} />);
    
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
  });
});