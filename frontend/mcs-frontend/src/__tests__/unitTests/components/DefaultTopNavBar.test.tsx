import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultTopNavBar from '../../../components/TopNavBar/DefaultTopNavBar';

describe('DefaultTopNavBar', () => {
  it('renders page name correctly', () => {
    render(<DefaultTopNavBar pageName="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('handles undefined page name', () => {
    render(<DefaultTopNavBar pageName={undefined} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });
});