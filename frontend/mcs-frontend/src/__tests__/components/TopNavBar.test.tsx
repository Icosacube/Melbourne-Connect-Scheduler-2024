import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopNavBar } from '../../components/TopNavBar/TopNavBar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard'
  })
}));

describe('TopNavBar', () => {
  it('renders DefaultTopNavBar for top-level pages', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('does not render anything for non-top-level pages', () => {
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({ pathname: '/events/123' });
    
    const { container } = render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });
});