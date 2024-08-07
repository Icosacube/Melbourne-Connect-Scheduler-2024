import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    render(<ProfileCard firstname="John" lastname="Doe" roletag="Developer" />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument(); // Avatar initials
  });
});