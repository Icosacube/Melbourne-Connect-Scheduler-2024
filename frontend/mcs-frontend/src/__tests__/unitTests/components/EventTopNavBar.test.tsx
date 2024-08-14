import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventTopNavBar from '../../../components/TopNavBar/EventTopNavBar';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('EventTopNavBar', () => {
  const mockGetCurTab = jest.fn();
  const mockOpenEditModal = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <EventTopNavBar getCurTab={mockGetCurTab} openEditModal={mockOpenEditModal} />
      </MemoryRouter>
    );
  });

  it('renders initial tab name', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('calls navigate when back button is clicked', () => {
    fireEvent.click(screen.getByTestId('ArrowBackIosIcon'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders edit and share buttons', () => {
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('calls openEditModal when edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOpenEditModal).toHaveBeenCalled();
  });
});