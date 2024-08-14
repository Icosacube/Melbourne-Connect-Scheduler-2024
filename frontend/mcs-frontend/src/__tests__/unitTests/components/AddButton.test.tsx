import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddButton } from '../../../components/AddButton/AddButton';

describe('AddButton', () => {
  it('renders with correct type and children', () => {
    render(<AddButton type="Event">Add Event</AddButton>);
    
    expect(screen.getByText('New Event')).toBeInTheDocument();
    expect(screen.getByText('Add Event')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    render(<AddButton type="Speaker">Add Speaker</AddButton>);
    
    const card = screen.getByRole('button');
    expect(card).toHaveStyle('background-color: #FFFF00');
  });
});