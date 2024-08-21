import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../../../components/ProfileCard/ProfileCard';

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    render(<ProfileCard firstName="John" lastName="Doe" roleTag="Developer" />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument(); // Avatar initials
  });
});