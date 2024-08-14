import React from 'react';
import { render, screen } from '@testing-library/react';
import { SideNavBar } from '../../../components/SideNavBar/SideNavBar';
import { MemoryRouter } from 'react-router-dom';

describe('SideNavBar', () => {
  it('renders overview tabs', () => {
    render(
      <MemoryRouter>
        <SideNavBar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Trips')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('renders event tabs', () => {
    render(
      <MemoryRouter>
        <SideNavBar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Participant')).toBeInTheDocument();
    expect(screen.getByText('Programme')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });
});