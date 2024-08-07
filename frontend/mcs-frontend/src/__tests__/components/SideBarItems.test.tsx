import React from 'react';
import { render, screen } from '@testing-library/react';
import { SideBarItems } from '../../components/SideNavBar/SideBarItems';

describe('SideBarItems', () => {
  it('renders the text prop correctly', () => {
    render(<SideBarItems text="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});