import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '../../components/BackButton/BackButton';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BackButton', () => {
  it('renders with correct text', () => {
    render(
      <MemoryRouter>
        <BackButton text="Go Back" />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('navigates back when clicked', () => {
    render(
      <MemoryRouter>
        <BackButton text="Return" />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('Return'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});