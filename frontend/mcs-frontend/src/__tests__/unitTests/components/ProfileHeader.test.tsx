import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileHeader } from '../../../components/ProfileHeader/ProfileHeader';

describe('ProfileHeader', () => {
  const props = {
    title: 'Dr.',
    firstname: 'Jane',
    lastname: 'Smith',
    organisation: 'University XYZ',
    role: 'Professor',
    faculty: 'Science',
    tags: ['Research', 'Teaching']
  };

  it('renders profile information correctly', () => {
    render(<ProfileHeader {...props} />);
    
    expect(screen.getByText('Dr.')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('University XYZ')).toBeInTheDocument();
    expect(screen.getByText('Language Assessment for Academic and Professional Purposes')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Teaching')).toBeInTheDocument();
  });
});